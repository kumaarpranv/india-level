const localStorageStore = localStorage;
const windowObj = window;
const documentObj = document;
const rootElement = document.documentElement;
const headElement = documentObj.head;
const createElement = name => documentObj.createElement(name);
const createImage = _=> new Image();
const addEventListener = (el,ev,callback) => el[`on${ev}`] = callback;
const getElementPosition = el => el.getBoundingClientRect();
const messages = {
    English: {
        message: {
            data_level_5: 'Lived Here',
            data_level_4: 'Stayed Here',
            data_level_3: 'Visited Here',
            data_level_2: 'Stopped Here',
            data_level_1: 'Passed Here',
            data_level_0_alt: 'Want to be Here',
            data_level_0: 'Never Been Here',
            pt: 'pt | pts',
        },
        country_name: {
          
 "Andaman and Nicobar":"Andaman and Nicobar" ,
 "Telangana":"Telangana" ,
 "Andhra Pradesh":"Andhra Pradesh" ,
 "Arunachal Pradesh":"Arunachal Pradesh" ,
 "Assam":"Assam" ,
 "Bihar":"Bihar" ,
 "Chandigarh":"Chandigarh" ,
 "Chhattisgarh":"Chhattisgarh" ,
 "Dadra and Nagar Haveli":"Dadra and Nagar Haveli" ,
 "Daman and Diu":"Daman and Diu" ,
 "Delhi":"Delhi" ,
 "Goa":"Goa" ,
 "Gujarat":"Gujarat" ,
 "Haryana":"Haryana" ,
 "Himachal Pradesh":"Himachal Pradesh" ,
 "Jharkhand":"Jharkhand" ,
 "Karnataka":"Karnataka" ,
 "Kerala":"Kerala" ,
 "Madhya Pradesh":"Madhya Pradesh" ,
 "Maharashtra":"Maharashtra" ,
 "Manipur":"Manipur" ,
 "Meghalaya":"Meghalaya" ,
 "Mizoram":"Mizoram" ,
 "Nagaland":"Nagaland" ,
 "Orissa":"Orissa" ,
 "Puducherry":"Puducherry" ,
 "Punjab":"Punjab" ,
 "Rajasthan":"Rajasthan" ,
 "Sikkim":"Sikkim" ,
 "Tamil Nadu":"Tamil Nadu" ,
 "Tripura":"Tripura" ,
 "Uttar Pradesh":"Uttar Pradesh" ,
 "Uttaranchal":"Uttaranchal" ,
 "West Bengal":"West Bengal" ,
 "Lakshadweep":"Lakshadweep" ,
 "Jammu and Kashmir":"Jammu and Kashmir" ,
 "Ladakh":"Ladakh" 
        }
    }
}
const i18n = VueI18n.createI18n({
    locale: 'English',
    fallbackLocale: 'English',
    messages,
})
const app1 = Vue.createApp().use(i18n).mount("#Layer_4")
const app2 = Vue.createApp().use(i18n).mount("#levels")
const app3 = Vue.createApp().use(i18n).mount("#Texts")

const colors = ['#F9CDC7', '#C5F9CB', '#CDE8F4', '#FDE8C4', '#D0DCD7', '#E1CEF5', '#D6D6D6'];
const color_randomizer = Math.floor(Math.random() * 7);
rootElement.style.backgroundColor = colors[color_randomizer]
addEventListener(rootElement,'click',e=>{
    if (e.target == documentObj.body) {
        const colorR = Math.floor(Math.random() * 50) + 176;
        const colorG = Math.floor(Math.random() * 50) + 176;
        const colorB = Math.floor(Math.random() * 50) + 176;
        rootElement.style.backgroundColor = '#' + colorR.toString(16) + colorG.toString(16) + colorB.toString(16)
    }
})

const levelsby = levels.children[0];

const closeAll = _=>{
    setLevelStyle.display = '';
    setLanguageStyle.display = '';
};
const data = {};
const getAllProvinceElements = _=>[...region.children];
const getAllProvinceLevels = _=>getAllProvinceElements().map(el=>+el.getAttribute('level')||0);
const localStorageLevelsKey = 'ind-levels';
const saveLevels = _=>{
    let localStorageValue = ""
    for (const provinceElement of getAllProvinceElements()) {
        if (provinceElement.getAttribute('alt') == "true") {
            localStorageValue += '-'
        }
        else localStorageValue += provinceElement.getAttribute('level')||0
    }
    localStorageStore.setItem(localStorageLevelsKey,localStorageValue);
};
const provinceLevelRegex = /^[\d|-]{56}$/;
const getLevelsAndApply = _=>{
    const levelsString = localStorageStore.getItem(localStorageLevelsKey);
    if(!provinceLevelRegex.test(levelsString)) return;
    const levels = levelsString.split('');
    getAllProvinceElements().forEach((element,index)=>{
        element.setAttribute('level',levels[index]=='-'?'0':levels[index])
        if (levels[index]=='-') element.setAttribute('alt', true);
    })
};
const graphic = documentObj.querySelector('svg');
const setLevelStyle = levels.style;
const minimumMargin = 6;
addEventListener(graphic,'click', e=>{
    e.stopPropagation();
    
    const { target: provinceElement } = e;
    const provinceElementPosition = getElementPosition(provinceElement);
    const { id } = provinceElement;
    data.provinceElement = provinceElement;
    data.id = id;

    levelsby.innerHTML = messages[Lang.textContent].country_name[id];
    setLevelStyle.display = 'block';
    const 设置等级元素方位 = getElementPosition(levels);
    
    let left = Math.round(provinceElementPosition.left + provinceElementPosition.width/2 - 设置等级元素方位.width/2);
    left = Math.min(
        left,
        document.body.offsetWidth - 设置等级元素方位.width - minimumMargin
    );
    left = Math.max(
        left,
        minimumMargin
    );

    let top = Math.round(provinceElementPosition.top + provinceElementPosition.height/2 - 设置等级元素方位.height/2);
    top = Math.min(
        top,
        document.body.offsetHeight - 设置等级元素方位.height - minimumMargin
    );
    top = Math.max(
        top,
        minimumMargin
    );

    setLevelStyle.left = left + 'px';
    setLevelStyle.top = top + 'px';
});
addEventListener(documentObj,'click',closeAll);
const calculateScore = _=>{
    const score = getAllProvinceLevels().reduce((total, current) => {
        return +total + current;
      }, 0);
    Total.innerHTML = `India Level ${score}`;
    webtitle.innerHTML = `India Level ${score}`;
}
addEventListener(levels,'click',e=>{
    e.stopPropagation();
    const level = e.target.getAttribute('data-level');
    if(!level) return false;
    data.provinceElement.setAttribute('level',level);
    const alt = e.target.hasAttribute('alt');
    if (alt) data.provinceElement.setAttribute('alt',true)
    else data.provinceElement.setAttribute('alt',false);
    closeAll();
    calculateScore();
    saveLevels();
})
addEventListener(Reset,'click',e=>{
    getAllProvinceElements().forEach((element,index)=>{
        element.setAttribute('level','0')
        element.setAttribute('alt', false);
        if (element.nodeName == 'g') {
            for (const child of element.children) {
                child.setAttribute('level','0');
                child.setAttribute('alt', false);
            }
        }
    })
    closeAll();
    calculateScore();
    saveLevels();
})

const language = documentObj.querySelector('#Lang');
const setLanguageStyle = Set_Lang.style;
addEventListener(language,'click', e=>{
    closeAll()
    e.stopPropagation();

    setLanguageStyle.display = 'block';
    const setLanguagePosition = getElementPosition(Set_Lang);
    const buttonPosition = getElementPosition(language);
    const currentLanguage = Lang.textContent;
    for (const child of Set_Lang.children) {
        if ( child.getAttribute('lang') == currentLanguage ) {
            child.style.background = "#aaa";
        }
        else {
            child.style.background = "#fff";
        }
    }
    
    let left = Math.round(buttonPosition.left + buttonPosition.width/2 - setLanguagePosition.width/2);
    left = Math.min(
        left,
        document.body.offsetWidth - setLanguagePosition.width - minimumMargin
    );
    left = Math.max(
        left,
        minimumMargin
    );

    let top = Math.round(buttonPosition.top - setLanguagePosition.height - minimumMargin);
    top = Math.min(
        top,
        document.body.offsetHeight - setLanguagePosition.height - minimumMargin
    );
    top = Math.max(
        top,
        minimumMargin
    );

    setLanguageStyle.left = left + 'px';
    setLanguageStyle.top = top + 'px';
});
const changeLanguage = (newLanguage)=>{
    i18n.global.locale = newLanguage
}
addEventListener(Set_Lang,'click',e=>{
    e.stopPropagation();
    const language = e.target.getAttribute('lang');
    if(!language) return false;
    Lang.textContent = language;
    closeAll();
    changeLanguage(language);
})

getLevelsAndApply();
calculateScore();

const readFileToURL = (rawData,callback)=>{
    const reader = new FileReader();
    reader.onload = e => callback(e.target.result);
    reader.readAsDataURL(rawData);
};
const fetchFontDataURL = (url,callback)=>{
    fetch(url).then(r => r.blob()).then(rawData => readFileToURL(rawData,callback));
};
const fetchFontStyle = (fontName,callback)=>{
    fetchFontDataURL(`${fontName}.woff?v=9`,url => callback(`@font-face {
        font-family: ${fontName};
        src: url(${url});
    };`));
};
fetchFontStyle('slice',callback=>{
    graphic.querySelector('style').innerHTML = callback;
    const styleElement = createElement('style');
    styleElement.innerHTML = callback;
    headElement.appendChild(styleElement);
    setTimeout(_=>rootElement.removeAttribute('data-loading'),2e3);
});

const width = 1000;
const height = 1356;
const scale = 1;

const canvas = createElement('canvas');

canvas.width = width * scale;
canvas.height = height * scale;

const context = canvas.getContext('2d');

const createGraphicFileFromDocText = docText=>{
    const rawData = new Blob([docText], {type: 'image/svg+xml'});
    return URL.createObjectURL(rawData);
};
const downloadFile = (link,fileName,element = createElement('a'))=>{
    element.download = fileName;
    element.href = link;
    element.click();
};
const urlToImageElement = (url,callback)=>{
    const image = createImage();
    addEventListener(image,'load',_=>callback(image));
    image.src = url;
};
const logAction = _=>(createImage()).src = `https://lab.magiconch.com/api/china-ex/log?levels=${getAllProvinceLevels().join('')}`;

const saveImage = _=>{
    const docText = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}px" height="${height}px">${graphic.innerHTML}</svg>`;
    const dataURL = createGraphicFileFromDocText(docText);
    urlToImageElement(dataURL,image=>{
        context.fillStyle = rootElement.style.backgroundColor; //'#b4b4ef';
        context.fillRect(
            0,0,
            width * scale,height * scale
        );
        context.drawImage(
            image,
            0,0,
            width,height,
            // 0,(width - height) * scale / 2,
            // width * scale, height * scale
        );
        canvas.toBlob(blob=>{
            const url = URL.createObjectURL(blob);
            downloadFile(url,`India Level 0.png`);

            mobid.style.display = '';
            mobid.querySelector('img').src = url;

        },'image/png');
    });
    logAction();
};

addEventListener(savebutton,'click',saveImage);

addEventListener(mobid.querySelector('a'),'click',_=>{
    mobid.style.display = 'none'
});
