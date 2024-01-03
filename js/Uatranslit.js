var Uatranslit = function()
{
    this.charmap = {
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "ґ": "g",
        "д": "d",
        "е": "e",
        "є": "je",
        "ж": "ž",
        "з": "z",
        "и": "y",
        "й": "j",
        "і": "i",
        "ї": "ji",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "h",
        "ц": "c",
        "ч": "č",
        "ш": "š",
        "щ": "šč",
        "ь": "x",
        "ю": "ju",
        "я": "ja",
        "'": "",
        "`": "",
    }

    this.charmapFull = Ocopy(this.charmap)

    //get unique chars of latin alphabet
    this.genChars = function()
    {
        let c = "";

        for(const[ua, t] of Object.entries(this.charmapFull)) {
            c += t
        }

        let ca = {}

        for(let i=0; i<c.length; i++)
        {
            ca[c[i]] = c[i]
        }

        return ca
    }

    this.replaceAt = function(str, index, replacement) {
        return str.substring(0, index) + replacement + str.substring(index + replacement.length);
    }

    this.toUppercase = function(char)
    {
        return char = this.replaceAt(char, 0, char[0].toUpperCase())
    }

    this.isTextUpperCase = function(text = "")
    {
        for(i=0; i < text.length; i++)
        {
            if(this.charmapFull[text[i]]!=undefined && text[i] !== text[i].toUpperCase())
            {
                capitalyzed = false;
                return false;
            }
        }

        return true;
    }

    this.translit = function(text = "")
    {
        let newText = ""

        for(i=0; i < text.length; i++)
        {
            //remove apostrof from inside the words
            if(text[i] === "'" || text[i] === "`")
            {
                //if char to the left or to the right - just remove
                if(
                    (text[i-1] != undefined && this.charmapFull[text[i-1]] == undefined)
                    ||
                    (text[i+1] != undefined && this.charmapFull[text[i+1]] == undefined)
                ) {
                    continue
                }
            }
            
            if(this.charmapFull[text[i]] != undefined)
                newText += this.charmapFull[text[i]]
            else
                newText += text[i]
        }

        return newText
    }    

    this.translitElement = function(el)
    {
        el.innerHTML = this.translit(el.innerHTML)
    }

    this.renderTable = function(el = null)
    {
        if(el == undefined || el == null)
        {
            el = document.body
        }

        let t = document.createElement("div")
        t.style.display = "inline-grid"
        t.style.gridTemplateColumns = "auto auto"
        t.style.fontSize = "2em"

        let c1 = document.createElement("div")
        c1.style.display = "inline-grid"
        c1.style.gridTemplateColumns = "auto auto auto"
        let c2 = document.createElement("div")
        c2.style.display = "inline-grid"
        c2.style.gridTemplateColumns = "auto auto auto"

        let i=0
        for(const[ua, t] of Object.entries(this.charmap)) {
            let d1 = document.createElement("div")
            d1.innerText = ua

            let di = document.createElement("div")
            di.innerText = ">"

            let d2 = document.createElement("div")
            d2.innerText = t
            if(i<17)
            {
                c1.appendChild(d1)
                c1.appendChild(di)
                c1.appendChild(d2)
            } else {
                c2.appendChild(d1)
                c2.appendChild(di)
                c2.appendChild(d2)
            }
            i++
        }

        t.appendChild(c1)
        t.appendChild(c2)
        el.innerHTML = ""
        el.appendChild(t)
    }

    this.renderEditForm = function(el = null)
    {
        if(el == undefined || el == null)
        {
            el = document.body
        }

        let t = document.createElement("div")
        t.style.display = "inline-grid"
        t.style.gridTemplateColumns = "auto auto"
        t.style.fontSize = "2em"

        let c1 = document.createElement("div")
        c1.style.display = "inline-grid"
        c1.style.gridTemplateColumns = "auto auto auto"
        let c2 = document.createElement("div")
        c2.style.display = "inline-grid"
        c2.style.gridTemplateColumns = "auto auto auto"

        let i=0
        for(const[ua, t] of Object.entries(this.charmap)) {
            let d1 = document.createElement("div")
            d1.innerText = ua

            let di = document.createElement("div")
            di.innerText = ">"

            let d2 = document.createElement("input")
            d2.type = "text"
            d2.setAttribute('size', '2')
            d2.setAttribute('lid', i)
            d2.classList.add('letter')
            d2.classList.add('lid-'+i)
            d2.value = t
            if(i<17)
            {
                c1.appendChild(d1)
                c1.appendChild(di)
                c1.appendChild(d2)
            } else {
                c2.appendChild(d1)
                c2.appendChild(di)
                c2.appendChild(d2)
            }
            i++
        }

        t.appendChild(c1)
        t.appendChild(c2)
        el.innerHTML = ""
        el.appendChild(t)
    }

    this.updateForm = function()
    {
        let i = 0
        for(const[ua, t] of Object.entries(this.charmap))
        {
            let le = document.querySelector('.lid-' + i)
            console.log(le.value)
            this.charmap[ua] = le.value
            i++
        }

        this.refresh()
    }

    this.refresh = function()
    {
        this.charmapFull = Ocopy(this.charmap)

        for(const[ua, t] of Object.entries(this.charmapFull)) {
            if(ua !=="`" && ua !== "'")
                this.charmapFull[ua.toUpperCase()] = this.toUppercase(t)
        }
    }

    this.refresh()

    

}

let Ocopy = function(obj, type)
{
	if(type==undefined || type==1) return JSON.parse(JSON.stringify(obj));
}