# YouTube Clone - Angular - EM DESENVOLVIMENTO
Este é um projeto Angular que replica a interface do YouTube, utilizando a API oficial do YouTube para exibir vídeos, detalhes do vídeo e funcionalidades básicas de pesquisa e reprodução.

## Funcionalidades
* Pesquisa de Vídeos: Busca na API do YouTube por vídeos através de palavras-chave.
* Reprodução de Vídeos: Reproduz vídeos diretamente na página, utilizando o player fornecido pela API do YouTube.
* Detalhes do Vídeo: Exibe informações detalhadas sobre cada vídeo, como título, descrição e visualizações.

## Configuração
1. Clone o repositório:
   `git clone https://github.com/flima21/YoutubeClone.git`
   `cd YoutubeClone`
2. Instale as dependências
   `npm install`

3. Configuração da API do YouTube:
    ```
      export const environment = {
        production: false,
        apiKey: 'SUA_CHAVE_DE_API_DO_YOUTUBE_AQUI'
      };
    ```
4. Inicie o servidor:
    `ng serve`

5. Acesse o Aplicativo:
Abra seu navegador e acesse http://localhost:4200.

## Uso 
* Na página inicial, é possível pesquisar por vídeos utilizando a barra de busca.
* Os resultados da pesquisa serão exibidos logo abaixo, permitindo a reprodução dos vídeos e visualização de detalhes ao clicar neles.

## Tecnologias Utilizadas
* Angular
* API do YouTube
