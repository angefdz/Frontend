const ranges: Array<[number, string[]]> = [
  [1, ['Eat','Drink','Sleep','Play','Read','Write','Draw','Run','Dance','Sing','Wash','Look','Talk','Listen','Think','Walk','Sit','Work','Travel','Cook','Study','Clean','Open','Close','Buy','Sell','Call','Climb','Swim','Shout','Laugh','Cry','Feel','Help','Search','Find','Wait','Fly','Fall','Jump','Push','Pull','Want','Cut','Break','Paint','Turn on','Turn off','Take','Put away','Forget','Sweep','Move','Hurt','Comb','Hear','Tire','Touch','Love','Turn','Fold','Take out','Lift']],
  [64, ['Mum','Dad','Brother','Sister','Friend','Boy','Girl','Grandfather','Grandmother','Neighbour','Father','Mother','Uncle','Aunt','Cousin','Cousin','Nephew','Niece','Son','Daughter','I','You','He','She','We','You','They','They','You','Goodbye','Thank you','Please','Sorry','I am sorry','Welcome','Good morning','Good afternoon','Good night']],
  [102, ['Table','Chair','Door','Window','Book','Phone','Computer','Pen','Clock','Bag','Shoe','Hat','Knife','Fork','Plate','Glass','Box','Key','Backpack','Lamp','Mirror','Brush','Pillow','Bed','Towel','Vase','Folder','Calendar','Notebook','Footwear','Bottle','Glasses','Battery','Radio','Cup','Paper','Paint','Screen','Mouse','Keyboard','Charger','Umbrella','Suitcase','Parasol','Camera','Map','Mirror']],
  [149, ['Apple','Pear','Banana','Watermelon','Melon','Strawberry','Grape','Lemon','Cherry','Pineapple','Blueberry','Avocado','Tomato','Lettuce','Carrot','Potato','Onion','Garlic','Cucumber','Chicken','Beef','Pork','Lamb','Fish','Seafood','Egg','Cheese','Bread','Rice','Pasta','Macaroni','Spaghetti','Soup','Salad','Hamburger','Pizza','Cake','Ice cream','Chocolate','Biscuit','Honey','Yoghurt']],
  [198, ['Sugar','Salt','Oil','Butter','Water','Juice','Coffee','Tea','Wine','Beer','Milk','Milkshake','Soft drink','Lemonade','Hot chocolate','Herbal tea']],
  [214, ['And','Or','Of','To','In','With','By','For','Without','On','Between','Until','From','Against','During','After','According to','The','The','The','My','His or her','Our','Our','Your','Your','My','Your','Their','Our','Our','Your','Your','Me','A','A','Some','Some','With you','Where','Who','Which','What','How','When','How much']],
  [260, ['Happy','Sad','Tired','Angry','Scared','Surprised','Embarrassed','Proud','Nervous','Worried','Satisfied','Anxious','Glad','Bored']],
  [274, ['Home','School','Park','Hospital','Shop','Beach','Forest','City','Village','Office','Restaurant','Church','Airport','Station','Library','Museum','Market','Bridge','Street','Mountain']],
  [294, ['Head','Arm','Hand','Leg','Foot','Eye','Ear','Mouth','Nose','Neck','Shoulder','Finger','Back','Heart','Stomach','Tooth','Hair','Skin','Knee','Elbow','Ankle']],
  [315, ['Red','Blue','Green','Yellow','Black','White','Purple','Pink','Grey','Brown','Beige','Lavender','Ochre','Maroon','Lilac','Cyan','Orange']],
  [332, ['Dog','Cat','Bird','Fish','Horse','Cow','Sheep','Hen','Rabbit','Snake','Lion','Tiger','Elephant','Monkey','Bear','Eagle','Turtle','Frog']],
  [350, ['Doll','Action figure','Soft toy','Car','Train','Jigsaw','Puzzle','Lorry','Plane','Puppet','Brick','Board','Kite','Dance','Spinning top','Scooter','Bicycle','Marble','Ball','Toy gun','Lego']],
  [371, ['Homework','Pencil','Ruler','Eraser','Blackboard','Class','Teacher','Student','Desk','Chalk','Calculator','Diary','Exam']],
  [384, ['Shirt','Trousers','Skirt','Shoes','Socks','Jacket','Gloves','Scarf','Coat','Dress','Belt','Boots','Tie','Pyjamas','Robe','Slippers','Waistcoat','Handkerchief']],
  [402, ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Twenty','Thirty','Forty','Fifty','One hundred']],
  [422, ['Bus','Boat','Motorbike','Taxi','Underground','Van','Tractor','Skateboard','Tram','Ferry']],
  [432, ['Wi-Fi','Drone','Games console','Microphone','USB drive','Disk','Mobile phone','Tablet','Printer','Speaker','Headphones','Television']],
  [444, ['Sun','Rain','Snow','Wind','Cloud','Storm','Hail','Fog','Thunder','Lightning','Cold','Heat','Hurricane','Tornado','Frost']],
  [459, ['Tree','Flower','Leaf','Grass','River','Sea','Lake','Desert','Sky','Earth','Sand','Rock','Lava','Volcano','Valley']],
  [474, ['Doctor','Nurse','Firefighter','Police officer','Lawyer','Cook','Engineer','Mechanic','Carpenter','Electrician','Gardener','Architect','Baker','Hairdresser','Photographer','Vet','Taxi driver','Soldier','Pilot','Secretary','Teacher','Tailor','Librarian','Judge','Waiter','Guard','Delivery driver','Painter','Doctor','Dentist','Agent','Dancer','Singer','Actor','Director','Guide','Technician','Plumber','Waiter']],
  [513, ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']],
  [520, ['January','February','March','April','May','June','July','August','September','October','November','December']],
  [532, ['Kitchen','Living room','Bathroom','Bedroom','Sofa','Microwave','Oven','Washing machine','Picture','Curtain','Rug']],
  [543, ['Confetti','Costume','Parade','Rocket','Lights','Decoration','Christmas','Halloween','New Year','Wedding','Anniversary','Birthday','Gift','Party','Cake','Candle','Carnival','Celebration','Music','Graduation','Concert','Fair']],
  [565, ['Hammer','Screwdriver','Drill','Saw','Pliers','Tape measure','Level','Screw','Nail','Spanner','Welder','Sander','Handsaw','Paintbrush','Shovel','Mallet','Ladder']],
  [582, ['Nurse','Medicine','Pill','Syringe','Thermometer','Appointment','Ambulance','Vaccine','Pain','Cough','Fever','Operation','Recovery','Health','Accident','Care','Diet','Rest']],
  [600, ['Guitar','Piano','Violin','Flute','Trumpet','Saxophone','Clarinet','Accordion','Trombone','Harp','Xylophone','Oboe','Cello','Double bass','Ukulele','Banjo','Maracas','Drum','Triangle','Castanets','Cajón']],
  [621, ['Football','Basketball','Tennis','Swimming','Athletics','Cycling','Gymnastics','Volleyball','Baseball','Hockey','Rugby','Boxing','Judo','Karate','Fencing','Horse riding','Climbing','Golf','Table tennis','Skiing','Snowboarding','Surfing','Skating','Rowing','Archery','Badminton','Hiking']],
  [648, ['Hello','Be','Be','You','Oneself','Us','You']],
];

export const generalPictogramNamesEn: Record<number, string> = Object.fromEntries(
  ranges.flatMap(([start, names]) => names.map((name, index) => [start + index, name]))
);

export const generalCategoryNamesEn: Record<number, string> = Object.fromEntries(
  ['Actions','People','Pronouns','Social','Objects','Food','Drinks','Connectors','Emotions','Places','Body','Colours','Animals','Toys','School','Clothing','Numbers','Transport','Technology','Weather','Nature','Professions','Days','Months','Home','Celebrations','Tools','Health','Instruments','Sports']
    .map((name, index) => [index + 1, name])
);
