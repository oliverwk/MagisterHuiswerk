document.body.style.border = "50px solid blue";
alert("HI!!!!!!!")
let s = document.createElement("script");
s.setAttribute("src", browser.runtime.getURL("script.js"));
document.body.appendChild(s);

browser.runtime.sendMessage({ greeting: "hello" }).then((response) => {
    console.log("Received response: ", response);
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);
});

console.log("Hello, world from content.js");

const selector = "#agenda-afspraak-bewerken-container > section > div > div.widget.wide.new-appointment-block > fieldset > ul";

class Dealine {
  constructor() {
      let li = document.createElement("li");
      let label = document.createElement("label");
      label.innerHTML = "Dealine";
      li.appendChild(label);
      let div = document.createElement("div");
      li.appendChild(div);
      
      let Kspan = document.createElement("span");
      Kspan.className = "k-widget k-datepicker k-header ng-binding";
      div.appendChild(Kspan);
      
      let KPspan = document.createElement("span");
      KPspan.className = "k-picker-wrap k-state-default";
      Kspan.appendChild(KPspan);
      
      let input = document.createElement("input");
      input.className = "ng-binding k-input";
      input.setAttribute("type", "date");
      input.setAttribute("id", "calendar");
      input.setAttribute("data-k-options", "agendaCalendarOptions");
      input.setAttribute("data-ng-bind", "calendarSelectedDate");
      input.setAttribute("data-k-on-change", "calendarOnChange(kendoEvent)");
      input.setAttribute("kendo-date-picker", "agendaCalendar");
      input.setAttribute("data-role", "datepicker");
      input.setAttribute("role", "combobox");
      input.setAttribute("aria-expanded", "false");
      input.setAttribute("aria-owns", "calendar_dateview");
      input.setAttribute("aria-disabled", "false");
      input.setAttribute("aria-readonly", "false");
      input.style.width = "100%";
      KPspan.appendChild(input);
      
      
      let Cspan = document.createElement("span");
      Cspan.className = "check";
      div.appendChild(Cspan);
      
      let Cinput = document.createElement("input");
      Cinput.setAttribute("type", "checkbox");
      Cinput.className = "checkbox ng-pristine ng-untouched ng-valid ng-empty";
      Cinput.setAttribute("name", "voordelesaf");
      Cinput.setAttribute("data-ng-model", "afspraak.VoorDeLesAf");
      Cinput.setAttribute("id", "voordelesaf");
      Cinput.setAttribute("tabindex", "4");
      Cspan.appendChild(Cinput);
      
      let Vlabel = document.createElement("label");
      Vlabel.setAttribute("for", "voordelesaf");
      Vlabel.innerText = "voor de les af";
      Vlabel.innerHTML = "<span></span>voor de les af";
      Cspan.appendChild(Vlabel);
      
      return li;
  }
}

function GetElement() {
    return new Promise(async (resolve, reject) => {
        try {
            let theList = document.querySelector(selector);
            resolve(theList);
            console.log("ThisIsTheElement:", theList);
        } catch (err) {
            if (e instanceof TypeError) {
                console.error("[ERROR] Whe coun't find the elemnt", err)
                reject(err);
             } else {
                 console.error("[ERROR] An error accourd in the querySelector", err)
                 reject(err);
            }
        }
    });
}

function AddDeadlineElement(list) {
    let DealineElement = new Dealine();
    list.appendChild(DealineElement);
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        let list = await GetElement();
        AddDeadlineElement(list);
    } catch (err) {
        console.error("[ERROR] At DOMContentLoaded", err);
    }
});

(async function () {
     try {
         console.log("Anonimos function")
         let list = await GetElement();
         AddDeadlineElement(list);
     } catch (err) {
         console.log("[ERROR] At DOMContentLoaded", err);
     }
})();
if (window.location.hostname === "wittopkoning.nl") {
    console.info("Hoi op wittopkoning.nl", window.location)
    alert("Hoi op wittopkoning.nl")
}

//TODO: Mabye add Service worker voor intercept reqeust en change met data
