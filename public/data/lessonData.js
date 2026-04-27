const lessonData = {
    1: {
        title: "Bevezetés a programozásba",
        content: `
            <h2>1. lecke: Bevezetés a programozásba</h2>

            <h3>Mit fogsz tanulni ebben a leckében?</h3>
            <p>
                Megtanulod, hogyan lehet a programod “eredményét” kiírni a konzolra.
                A konzol (console) olyan, mint a program naplója: ide írhatsz ki üzeneteket,
                számítások eredményét vagy változók értékét.
            </p>

            <h3>Mi az a konzol?</h3>
            <p>
                A konzol egy felület, ahol a JavaScript futása közben üzeneteket jeleníthetsz meg.
                Tanulás közben ez különösen hasznos, mert azonnal látod, hogy mit csinál a kódod.
            </p>

            <h3>Feladat:</h3>
            <p>Írj egy olyan programot, ami a konzolra kiírja ezt a szöveget:</p>
            <p><strong>Hello World!</strong></p>

            <p class="hint">
                Tipp:
                Használd a <code>console.log()</code> függvényt.
                A kiírandó szöveget idézőjelek közé kell írni (<code>"..."</code>).
                Ne felejtsd el a pontosvesszőt a sor végén (<code>;</code>).
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="1-1"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    2: {
        title: "Változók és adattípusok",
        content: `
            <h2>2. lecke: Változók és adattípusok</h2>

            <h3>Mi az a változó?</h3>
            <p>
                A változó egy “névvel ellátott láda”, amiben adatokat tárolhatsz.
                Ha egyszer eltároltál benne egy értéket, később a változó nevén keresztül elérheted.
            </p>

            <h3>Alap adattípusok</h3>
            <ul>
                <li><strong>Szöveg (string)</strong>: pl. <code>"Réka"</code></li>
                <li><strong>Szám (number)</strong>: pl. <code>25</code></li>
                <li><strong>Logikai (boolean)</strong>: <code>true</code> vagy <code>false</code></li>
            </ul>

            <h3>Feladat:</h3>
            <p>Hozz létre 3 változót, majd írd ki mindegyiket a konzolra külön sorban:</p>
            <ul>
                <li><code>nev</code> – szöveg (pl. "Réka")</li>
                <li><code>kor</code> – szám (pl. 25)</li>
                <li><code>diak</code> – logikai érték (true/false)</li>
            </ul>

            <p class="hint">
                Tipp:
                Változó létrehozása: <code>let nev = "Réka";</code><br>
                Kiírás: <code>console.log(nev);</code><br>
                A többi változónál is ugyanez a minta.
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="2-1"
                    data-mode="strict"
                    
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    3: {
        title: "Vezérlési szerkezetek",
        content: `
            <h2>3. lecke: Vezérlési szerkezetek</h2>

            <h3>Mi az a vezérlési szerkezet?</h3>
            <p>
                A vezérlési szerkezetekkel “irányítod” a program futását:
                döntéseket hozol (if), vagy ismételsz (ciklusok).
            </p>

            <h3>If feladat (döntés):</h3>
            <p>
                Az <code>if</code> arra való, hogy a program egy feltétel alapján két (vagy több) irányba tudjon menni.
                Ha a feltétel igaz, az egyik ág fut le, ha hamis, akkor a másik.
            </p>

            <p><strong>Feladat:</strong></p>
            <p>Legyen egy <code>kor</code> változó 18-as értékkel. Ha <code>kor &gt;= 18</code>, írd ki: <strong>Nagykorú</strong>, különben: <strong>Kiskorú</strong>.</p>

            <p class="hint">
                Tipp:
                Használd az <code>if (...) { ... } else { ... }</code> szerkezetet.
                A feltétel itt: <code>kor &gt;= 18</code>.
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="3-1"
                    data-mode="strict"
                    
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <hr>

            <h3>For ciklus (ismétlés):</h3>
            <p>
                A ciklusok arra valók, hogy ne kelljen ugyanazt a kódot többször leírni.
                A <code>for</code> ciklusnál általában van:
            </p>
            <ul>
                <li>egy számláló (pl. <code>i</code>),</li>
                <li>egy feltétel, amíg fut a ciklus,</li>
                <li>és egy lépés, ami a számlálót változtatja (pl. <code>i++</code>).</li>
            </ul>

            <p><strong>Feladat:</strong></p>
            <p>Írj egy <code>for</code> ciklust, ami 0-tól 4-ig kiírja a számokat a konzolra (minden szám külön sorban).</p>

            <p class="hint">
                Tipp:
                A feltétel úgy lesz jó, ha a ciklus 5-ig futna, de 4 a legutolsó kiírt érték.
                Gondold végig: 0,1,2,3,4 → ez összesen 5 szám.
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="3-2"
                    data-mode="strict"
                    
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    4: {
        title: "Függvények",
        content: `
            <h2>4. lecke: Függvények</h2>

            <h3>Mi az a függvény, és mire jó?</h3>
            <p>
                A függvény egy olyan kódrészlet, amit egyszer megírsz, és utána többször is fel tudsz használni.
                Ez segít abban, hogy a program átláthatóbb legyen, és ne kelljen ugyanazt a logikát sokszor megismételni.
            </p>

            <h3>Létrehozás vs. meghívás</h3>
            <p>
                Fontos különbség: a függvény <strong>létrehozása</strong> még nem futtatja le a kódot.
                A függvény csak akkor hajtódik végre, ha <strong>meghívod</strong>.
                </p>
                
               <p> <strong>Érdekesség:</strong> Ha ezt írnád <strong>Szia12!</strong> JavaScriptben az is helyes lenne, mert a számot is szövegként értelmezné a program nyelv.
                Próbáld ki itt is, ha szeretnéd. Más hasonló feladatokban is kipróbálhatod ezt.
                </p>

            <h3>Feladat 1: Egyszerű függvény</h3>
            <p>
                Készíts egy <code>koszont</code> nevű függvényt, ami kiírja a konzolra: <strong>Szia!</strong>
                Ezután hívd meg a függvényt.
            </p>

            <p class="hint">
                Tipp:
                Függvény létrehozása: <code>function koszont() { ... }</code><br>
                Meghívás: <code>koszont();</code><br>
                A meghívásnál a zárójelek <code>()</code> nagyon fontosak!
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="4-1"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <hr>

            <h3>Paraméteres függvények</h3>
            <p>
                A paraméter lehetővé teszi, hogy a függvény “bemenetet” kapjon.
                Így ugyanaz a függvény sokféle adatot tud feldolgozni.
            </p>

            <h3>Feladat 2: Paraméteres függvény</h3>
            <p>
                “Készíts egy hello függvényt, ami kap egy nev paramétert,
                    és kiír egy köszönést + a nevet. A köszönés szabadon választható (pl. ‘Szia’, ‘Hello’, ‘Üdv’).
                    Végül hívd meg tetszőleges névvel.”
            </p>

            <p class="hint">
                Tipp:
                A függvényen belül a <code>nev</code> egy változó.
                Összefűzés: <code>"Szia " + nev + "!"</code>
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="4-2"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    5: {
        title: "Tömbök",
        content: `
            <h2>5. lecke: Tömbök</h2>

            <h3>Mi az a tömb?</h3>
            <p>
                A tömb (array) több adatot tárol egyetlen változóban, sorrendben.
                Például ha több számot szeretnél együtt kezelni, akkor tömböt használsz.
            </p>

            <h3>Indexelés (0-tól indul!)</h3>
            <p>
                A tömb elemei sorszámot kapnak, ezt indexnek hívjuk.
                Az első elem indexe: <strong>0</strong>.
            </p>

            <h3>Feladat:</h3>
            <p>
                Hozz létre egy <code>szamok</code> nevű tömböt ezekkel az elemekkel: <strong>1, 2, 3, 4</strong>.
                Ezután:
            </p>
            <ul>
                <li>írd ki az első elemet (index: 0)</li>
                <li>írd ki a tömb hosszát (<code>length</code>) úgy, hogy a konzolon látszódjon, hogy ez a hossz</li>
            </ul>

            <p class="hint">
                Tipp:
                Első elem: <code>szamok[0]</code><br>
                Hossz: <code>szamok.length</code>
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="5-1"
                    data-mode="strict"
                    
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

   6: {
  title: "Matematikai műveletek",
  content: `
    <h2>6. lecke: Matematikai műveletek</h2>

    <h3>Mit fogsz tanulni?</h3>
    <p>
      Ebben a leckében megtanulod az alap műveleteket JavaScriptben:
      összeadás (<code>+</code>), kivonás (<code>-</code>), szorzás (<code>*</code>), osztás (<code>/</code>).
    </p>

    <h3>Hogyan működik?</h3>
    <p>
      Lesz két változód: <code>a</code> és <code>b</code> (0–99 közötti <strong>egész</strong> számok).
      Ezekkel számolunk, majd az eredményt <code>console.log()</code>-gal kiírjuk.
    </p>

    <h3>Feladat 1: Összeadás</h3>
    <p>
      Hozz létre két változót: <code>a</code> és <code>b</code> (0–99 közötti egész számok),
      majd írd ki a konzolra az <code>a + b</code> eredményét.
    </p>

    <p class="hint">
      Tipp:<br>
      • Két változó létrehozása: <code>let a = 10;</code> és <code>let b = 2;</code><br>
      • Összeadás: <code>a + b</code><br>
      • Kiírás: <code>console.log(a + b);</code>
    </p>

    <div class="code-runner">
      <textarea class="code-input" spellcheck="false"></textarea>
      <button class="run-btn"
        data-task-id="6-1"
        data-mode="strict"
        
        onclick="runTask(this)">▶ Futtatás</button>
      <div class="output-box"></div>
    </div>

    <hr>

    <h3>Feladat 2: Kivonás</h3>
    <p>
      Ugyanazokkal a változókkal (<code>a</code>, <code>b</code>) írd ki a konzolra az
      <code>a - b</code> eredményét.
    </p>

    <p class="hint">
      Tipp:<br>
      • Kivonás: <code>a - b</code><br>
      • Kiírás: <code>console.log(a - b);</code>
    </p>

    <div class="code-runner">
      <textarea class="code-input" spellcheck="false"></textarea>
      <button class="run-btn"
        data-task-id="6-2"
        data-mode="strict"
        
        onclick="runTask(this)">▶ Futtatás</button>
      <div class="output-box"></div>
    </div>

    <hr>

    <h3>Feladat 3: Szorzás</h3>
    <p>
      Írd ki a konzolra az <code>a * b</code> eredményét.
    </p>

    <p class="hint">
      Tipp:<br>
      • Szorzás: <code>a * b</code><br>
      • Kiírás: <code>console.log(a * b);</code>
    </p>

    <div class="code-runner">
      <textarea class="code-input" spellcheck="false"></textarea>
      <button class="run-btn"
        data-task-id="6-3"
        data-mode="strict"
        
        onclick="runTask(this)">▶ Futtatás</button>
      <div class="output-box"></div>
    </div>

    <hr>

    <h3>Feladat 4: Osztás</h3>
    <p>
      Írd ki a konzolra az <code>a / b</code> eredményét.
      (Ha JavaScript nyelvben 0-val osztunk az nem hibás, hanem Infinity-t vagy ha 0-át 0-val osztunk akkor NaN-t ad, ezt jó, ha tudjuk ennél a nyelvnél, természetesen normál is esetben 0-val nem lehet osztani.)
    </p>

    <p class="hint">
      Tipp:<br>
      • Osztás: <code>a / b</code><br>
      • Kiírás: <code>console.log(a / b);</code><br>
      • Tipp: ha biztosra akarsz menni, adj <code>b</code>-nek 0–99 közötti értéket.
    </p>

    <div class="code-runner">
      <textarea class="code-input" spellcheck="false"></textarea>
      <button class="run-btn"
        data-task-id="6-4"
        data-mode="strict"
        
        onclick="runTask(this)">▶ Futtatás</button>
      <div class="output-box"></div>
    </div>
  `
},
    7: {
        title: "DOM tartalom módosítása",
        content: `
            <h2>7. lecke: DOM tartalmának módosítása</h2>

            <h3>Mi az a DOM?</h3>
            <p>
                A DOM (Document Object Model) a weboldal HTML-elemeinek “modellje”.
                JavaScriptből el tudod érni a HTML elemeket, és módosítani tudod a tartalmukat, kinézetüket, viselkedésüket.
            </p>

            <h3>Feladat:</h3>
            <p>Az alábbi címsor szövegét fogjuk JavaScriptből módosítani:</p>

            <div class="dom-demo-box">
                <h3 id="cim">Eredeti cím</h3>
            </div>

            <p>
                Írj olyan kódot, ami megkeresi az <code>id="cim"</code> elemet, és átírja a szövegét erre:
                <strong>Új cím!</strong>, de bármilyen más szöveget is írhatsz az <strong>"Új cím!"</strong> helyett.
            </p>

            <p class="hint">
                Tipp:
                Elem kiválasztása: <code>document.getElementById("cim")</code><br>
                Szöveg módosítása: <code>.innerText = "Új cím!"</code>
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="7-1"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    8: {
        title: "Eseménykezelés",
        content: `
            <h2>8. lecke: Eseménykezelés</h2>

            <h3>Mi az eseménykezelés?</h3>
            <p>
                A weboldalak gyakran reagálnak a felhasználó műveleteire: kattintás, billentyűlenyomás, görgetés stb.
                A JavaScriptben “eseménykezelőket” állítunk be, amelyek akkor futnak le, amikor az esemény megtörténik.
            </p>

            <p>Most egy <strong>valódi gombot</strong> fogunk kezelni JavaScriptből:</p>

            <button id="gomb" class="run-btn" style="background:#2196f3;margin-bottom:10px;">
                Kattints ide, ha a kód jó!
            </button>

            <h3>Feladat:</h3>
            <p>
                Állíts be egy kattintás eseménykezelőt a <code>gomb</code> id-jú gombra.
                Kattintáskor jelenjen meg egy felugró ablak ezzel a szöveggel, például:
                <strong>Siker!</strong>, de más szöveggel is működik.
            </p>

            <p class="hint">
                Tipp:
                <code>document.getElementById("gomb").onclick = function() { ... }</code><br>
                A blokkon belül: <code>alert("Siker!");</code>
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="8-1"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    9: {
        title: "API-k",
        content: `
            <h2>9. lecke: API-k</h2>

            <h3>Mi az az API?</h3>
            <p>
                Az API (Application Programming Interface) egy olyan felület, 
                amely lehetővé teszi, hogy két szoftver adatokat kérjen egymástól és kommunikáljon egymással.
                Legegyszerűbben ezt úgy lehet elmagyarázni mint egy éttermi étlapot: 
                az étlap felsorolja a választható ételeket (funkciókat), te rendelsz (kérés), a konyha pedig elkészíti és visszaküldi neked (válasz).

            
            A weben az API általában egy URL formájában jelenik meg.
            Ha ezt az URL-t meghívjuk, a szerver adatokat küld vissza
            (például időjárás-adatokat vagy felhasználói listát).
            </p>

            <h3>Mi az a fetch?</h3>
            <p>
                A <code>fetch()</code>  egy beépített JavaScript függvény, amivel hálózati kéréseket indíthatunk. Ez a módszer indítja el a folyamatot, hogy adatot kérjünk egy API-tól.

                A <code>fetch()</code>  mindig egy Promise-szal tér vissza.
            </p>

            <h3>Mi az a promise?</h3>
            <p>
                A Promise (ígéret) egy olyan objektum, amely egy jövőben elkészülő művelet eredményét képviseli. Mivel az adatlekérés időbe telik, a JavaScript nem várja meg a választ, hanem egy "ígéretet" kap, hogy a művelet:

               1. Pending: Folyamatban van.

               2. Fulfilled: Sikeresen teljesült (megvan az adat).

               3. Rejected: Hiba történt (pl. nincs internet).
            </p>

            <h3>Mi az a JSON?</h3>
            <p>
            A JSON az adatok formátuma. 
            Ez egy könnyen olvasható szöveges szabvány, amit szinte minden programnyelv megért. Amikor az API válaszol a fetch() kérésünkre, az adatok általában JSON formátumban érkeznek.
            </p>

            <h3>Feladat:</h3>
            <p>
                Írj egy <code>fetch()</code> hívást egy URL-re (pl. <code>"https://api.example.com"</code>), majd:
            </p>
            <ul>
                <li>alakítsd át a választ JSON-ná: <code>res.json()</code></li>
                <li>írd ki az eredményt a konzolra: <code>console.log(data)</code></li>
            </ul>

            <p class="hint">
                Tipp:
                A feldolgozás lépései általában: <strong>fetch → json → log</strong> (then lánccal).
                Figyelj az arrow function nyílra: <code>=&gt;</code>
            </p>

            <p>
                Ez az URL csak egy példa, nem valódi API, csak a feladat bemutatása miatt van benne, ha ténylegesen rákeresnénk hibát kapnánk (pl. <code>"https://api.example.com"</code>).
                A feladat célja, hogy kipróbáld, hogyan kell egy fetch() hívást és Promise láncot megírni.
            </p>

            <p>Ha ez az URL ténylegesen működne, akkor valami ilyesmit adna, miután beírtuk ezt a kódsort.:
             <pre class="code-example">
{
    "name": "Réka",
    "age": 35
}
</pre>
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="9-1"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    10: {
        title: "Projekt befejezése",
        content: `
            <h2>10. lecke: Projekt befejezése</h2>

            <h3>Mit tanultál eddig?</h3>
            <ul>
                <li>Kiírás a konzolra</li>
                <li>Változók és adattípusok</li>
                <li>Döntés (if) és ismétlés (for)</li>
                <li>Függvények és paraméterek</li>
                <li>Tömbök és objektumok</li>
                <li>Matematikai műveletek</li> 
                <li>DOM tartalmának módosítás</li>
                <li>Eseménykezelés</li>
                <li>API alapok (fetch)</li>
            </ul>

            <h3>Utolsó feladat:</h3>
            <p>Írj egy programot, ami kiírja a konzolra:</p>
            <p><strong>Kész a tanfolyam!</strong></p>

            <p class="hint">
                Tipp:
                Ugyanaz az elv, mint az 1. leckében: <code>console.log("...");</code>
            </p>

            <div class="code-runner">
                <textarea class="code-input" spellcheck="false"></textarea>
                <button class="run-btn"
                    data-task-id="10-1"
                    data-mode="strict"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    }
};