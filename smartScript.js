
var apps = [
    { 
        title: "Text Tools App", 
        desc: "Do PDF to Text, Word Counter, Notes, Encrypt/Decrypt offline.", 
        img: "https://via.placeholder.com/150?text=Text", 
        link: "https://example.com/apk/text-tools.apk", 
        version: "v1.0", 
        category: "Tools" 
    },
    { 
        title: "Job Finder Ethiopia", 
        desc: "Daily offline job updates.", 
        img: "https://via.placeholder.com/150?text=Jobs", 
        link: "https://example.com/apk/job-finder.apk", 
        version: "v2.1", 
        category: "Jobs" 
    },
    { 
        title: "Notes Keeper", 
        desc: "Lightweight offline notes app.", 
        img: "https://via.placeholder.com/150?text=Notes", 
        link: "https://example.com/apk/notes-keeper.apk", 
        version: "v1.3", 
        category: "Utility" 
    }
];

/* Create category buttons */
var categories = ["All"];
for (var i=0; i<apps.length; i++){
    if(categories.indexOf(apps[i].category) === -1){
        categories.push(apps[i].category);
    }
}

function buildCategoryButtons(){
    var area = document.getElementById("categoryArea");
    area.innerHTML = "";
    for(var i=0; i<categories.length; i++){
        var btn = document.createElement("button");
        btn.className = "cat-btn";
        btn.textContent = categories[i];
        if(i===0) btn.classList.add("active");
        btn.onclick = function(){
            var all = document.getElementsByClassName("cat-btn");
            for(var j=0;j<all.length;j++) all[j].classList.remove("active");
            this.classList.add("active");
            loadApps(this.textContent);
        };
        area.appendChild(btn);
    }
}

/* Load apps list */
function loadApps(filter){
    var list = document.getElementById("appList");
    var search = document.getElementById("searchBox").value.toLowerCase();
    list.innerHTML = "";

    for(var i=0; i<apps.length; i++){
        var a = apps[i];

        if(filter !== "All" && a.category !== filter) continue;
        if(a.title.toLowerCase().indexOf(search) === -1 && a.desc.toLowerCase().indexOf(search) === -1) continue;

        var card = document.createElement("div");
        card.className = "app-card";

        card.onclick = (function(appData){
            return function(){ openPopup(appData); };
        })(a);

        card.innerHTML = 
            "<img src='"+a.img+"'>"+
            "<div style='flex:1'>"+
                "<div class='app-title'>"+a.title+"</div>"+
                "<div class='app-desc'>"+a.desc+"</div>"+
            "</div>"+
            "<a href='"+a.link+"' download='"+a.title+".apk' onclick='event.stopPropagation();'>"+
                "<button class='download-btn'>Download</button>"+
            "</a>";

        list.appendChild(card);
    }
}

/* Popup functions */
function openPopup(app){
    document.getElementById("pTitle").textContent = app.title;
    document.getElementById("pVersion").textContent = app.version;
    document.getElementById("pDesc").textContent = app.desc;
    var link = document.getElementById("pDownloadLink");
    link.href = app.link;
    link.setAttribute("download", app.title+".apk");
    document.getElementById("popup").style.display = "flex";
}

function closePopup(){ 
    document.getElementById("popup").style.display = "none"; 
}

/* Theme toggle with emoji and text */
document.getElementById("themeToggle").onclick = function(){
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        this.textContent = "☀️ Light";
    } else {
        this.textContent = "🌙 Dark";
    }
};

/* Live search */
document.getElementById("searchBox").oninput = function(){
    var activeCat = document.querySelector(".cat-btn.active").textContent;
    loadApps(activeCat);
};

/* Initialize */
buildCategoryButtons();
loadApps("All");