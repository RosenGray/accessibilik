const DYSLEXIA_FONT_STYLE = `
 @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap');

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://acc-landing.vercel.app/fonts/OpenDyslexic-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://acc-landing.vercel.app/fonts/OpenDyslexic3-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://acc-landing.vercel.app/fonts/OpenDyslexic3-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://acc-landing.vercel.app/fonts/OpenDyslexic-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://acc-landing.vercel.app/fonts/OpenDyslexic-Regular.otf') format('opentype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'OpenDyslexic';
    src: url('https://acc-landing.vercel.app/fonts/OpenDyslexic-Bold.otf') format('opentype');
    font-weight: bold;
    font-style: normal;
}


html{
    font-family: OpenDyslexic,Comic Neue,Arial,Helvetica,sans-serif !important
  
}

html *, *{
    font-family: OpenDyslexic,Comic Neue,Arial,Helvetica,sans-serif !important
}

html.acc-font-weight{
    font-family: OpenDyslexic,Comic Neue,Arial,Helvetica,sans-serif !important 
}


`;

export default DYSLEXIA_FONT_STYLE;
