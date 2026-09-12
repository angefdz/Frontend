# Manual pictogram ordering

Implemented in `mi-tfg-app` and the active Spring backend, `Backend-tfg`. The archived `Backend/` copy is not changed.

## Behavior and architecture

- Main screen header: Edit / Editar → existing account password → edit mode → Done / Listo.
- This application has accounts, not distinct administrator roles or separate AAC subprofiles. The account password authorizes administration of that account's layout. BCrypt/AuthService and existing JWT signing are reused; no new credential store exists.
- Normal mode retains the existing paginated grid, labels, dimensions and communication callback. Only the authenticated editor mounts gesture support. Its pictogram callbacks cannot activate communication, including accessibility activation.
- Hold for 350 ms, drag to preview insertion, release to keep the draft. Hold within 32 px of either edge to move across pages (700 ms between page changes). Ordinary swipes still page; vertical scrolling is suspended only during an active drag.
- Reset requires confirmation and changes the draft only. Done persists it. Leaving the screen or backgrounding the app discards the unsaved draft and authorization.
- A single order belongs to the authenticated account. Category views filter this order; editing one category changes the same vocabulary's global layout, preserving other category/hidden slots. Category order itself is unchanged.
- Stable default: ascending unique pictogram ID. Previous SQL queries had no explicit ORDER BY. Predictions, frequency, names and translated labels never influence this order.
- Saved order includes hidden vocabulary. New IDs append; deleted IDs are ignored. Existing custom pictograms survive reset. No visibility, category, sentence, prediction or other settings are written.
- A failed save retains edit mode and reports the error. An expired edit grant returns to the saved layout and requests authentication again. Concurrent changes produce HTTP 409 instead of overwriting another edit.
- The keyboard waits for the saved order before showing vocabulary, avoiding a transient layout shuffle. A failed order load exposes a retry action.

## Backend / database

`GET /orden-pictogramas`: ordered IDs, including hidden vocabulary, for the authenticated account.

`POST /orden-pictogramas/autorizar`: verifies `contrasena` with existing AuthService and returns an in-memory, 15-minute, profile-bound edit grant. A grant cannot substitute for the normal session token.

`PUT /orden-pictogramas`: requires the normal session plus edit grant, original `base` IDs, reordered `ids`, and optional `reset`. Validates the permutation and concurrent edits, locks the account row, then writes explicit positions transactionally.

Additive table: `orden_pictogramas(id, usuario_id, pictograma_id, posicion)`, unique on user/pictogram. SQL: `Backend-tfg/migrations/20260912_orden_pictogramas.sql`. Existing local `ddl-auto=update` creates it on backend startup; for managed deployments apply the SQL migration first. No live database was modified during development.

Scalar IDs avoid introducing foreign-key constraints into existing deletion flows. Obsolete rows for deleted pictograms are ignored immediately and cleaned on the next save/reset. Rows for deleted accounts need eventual housekeeping; this is retained technical debt rather than changing unrelated account deletion code.

Deploy the backend before the frontend, because the keyboard requires the order endpoint. No dependency changes or Expo/React Native upgrades.

## Verification results

- Frontend: 12 tests pass (`node --test tests/layout/*.test.cjs`). Tests exercise ordering utilities, the actual editor hook with mocked native/network boundaries, and normal/edit grid selection behavior.
- TypeScript: `tsc --noEmit` passes.
- Targeted ESLint: no errors; two existing main-screen hook dependency warnings remain.
- New backend tests: 8 pass (6 unit/security, 2 H2 database/HTTP integration tests).
- Full backend suite: 71 tests, 43 pass, 27 failures and 1 error. The untouched backend has exactly the same 28 failing test names (63 tests, 35 pass). Existing auth fixtures conflict with current password/serialization behavior; these unrelated tests were not modified.
- Java tests used the installed Homebrew JDK and an explicit Mockito Java agent because automatic agent attachment failed in this environment. All database tests used disposable H2 databases, never the user's MySQL data.
- No physical-device touch verification has been performed.

## Mobile acceptance checklist (iOS and Android)

1. In normal mode, tap nouns and verbs, build/speak/delete a sentence, select predictions, browse categories and swipe pages. Long holds and accidental drags must not move vocabulary.
2. Press Edit in the top bar. Cancel, use a wrong password, and then use the correct account password. Only success should show Done and drag handles.
3. Hold and drag within a page, backward/forward, across rows, onto the final partially filled page, and across pages using both edges. Check insertion previews, ghost feedback and scrolling at all configured grid sizes, on phone/tablet and after rotation. No dragged pictogram should enter the sentence or verb dialog.
4. Press Done; navigate away/back, reload and force-close/relaunch. Verify identical order under the same account and independence under a second account.
5. Hide a middle pictogram, reorder visible vocabulary, and unhide it. Verify its saved slot. Add and delete custom pictograms; existing order should remain, and newly created vocabulary should append.
6. Test editing within a category, including pictograms shared by multiple categories. Other-category and hidden slots should remain unchanged.
7. Reset: cancel first, then confirm and press Done. Custom vocabulary and visibility must remain; sentences, predictions, category assignments and settings must not change.
8. Interrupt authentication by cancelling or backgrounding. Simulate offline saves, session/edit-grant expiry and conflicting saves from a second device. No failed operation should silently persist changes. For a conflict, leave/reopen to load the latest order.
9. Verify VoiceOver/TalkBack normal selection behavior and header/dialog focus; test touch responsiveness with a large vocabulary. The editor currently requires touch dragging rather than dedicated screen-reader move actions.
