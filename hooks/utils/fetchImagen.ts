
export async function fetchImagen(palabra: string): Promise<string | null> {
    try {
      const response = await fetch(
        `https://api.arasaac.org/api/pictograms/es/search/${encodeURIComponent(palabra)}`
      );
      const data = await response.json();
  
      if (!data || data.length === 0) return null;
  
      const pictogramaId = data[0]._id;
  

      return `https://static.arasaac.org/pictograms/${pictogramaId}/500/1_1_1.png`;
    } catch (error) {
      console.error(`Error buscando "${palabra}" en ARASAAC:`, error);
      return null;
    }
  }
  