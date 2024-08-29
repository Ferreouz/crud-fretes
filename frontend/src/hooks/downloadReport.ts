import getCookie from "../utils/getCookie";

export async function downloadReport(){
    fetch(import.meta.env.VITE_BACKEND_URL + "/report/yesterday", {
        headers: {
            Authorization: `Bearer ${getCookie("_auth")}`
        }
    }) .then((response) => {
        if(response.status != 200) {
            throw new Error("error downloading file");
        }
        return response.blob();
    })
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `relatorio-fretes-${new Date(Date.now() - 86400000).toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsx`,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
      link?.parentNode?.removeChild(link);
                                    
    }).catch(e => {
        console.log(e)
        alert("Ocorreu um erro ao pegar o relatorio gerado, talvez não haja fretes finalizados no dia de ontem")
    });
  }