const form = document.querySelector("#regForm");
let isAuth = false;
const host = window.location.host.replaceAll(".", "!");

class Api {
    static async get(){
        return await (await fetch("/api/get", {
            method: "POST",
            credentials: "include",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({host})
        })).json();
    }

    static async addCoins(count){
        return await (await fetch("/api/addCoins", {
            method: "POST",
            credentials: "include",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count, host })
        })).json();
    }

    static async subCoins(count){
        let data = null;
        await fetch("/api/subCoins", {
            method: "POST",
            credentials: "include",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ count, host })
        })
        .then(async v => {
            if(v.status !== 401)
                data = await v.json();
        })
        .catch(e => console.log(e));
        return data;
    }
}

async function getUserCountry() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching IP data:', error);
  }
}

async function registration(){
    const data = new FormData(form);

    const dataUserIpAndCountry = await getUserCountry();

    try {
        const req = await fetch("https://platform.20bet.com/partner/v2/registration", {
            method: "POST",
            headers: {
                'partner-sign': 'de1ea4bd9cde8a961bdd8f68343a967f',
                'partner-ip': dataUserIpAndCountry.ip,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
                country: 'PT',
                currency: 'EUR',
                promoCode: "NEWBONUS",
            })
        });

        if (req.status === 401 || req.status === 400) throw Error();
        const res = await req.json();

        localStorage.setItem('token', res.data.token);

        isAuth = true;
        window.location.href=`/main.php`;
    } catch(e){
        alert("Authentication error");
        console.error(e);
    }
}

async function login() {
    const data = new FormData(form);
    try{
        const req = await fetch("/api/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email: data.get('email'), password: data.get('password'), host})
        });
        if(req.status === 401 || req.status === 400) throw Error();
        const res = await req.json();
        localStorage.setItem('token', res.accessToken);
        isAuth = true;
        window.location.href="/";
    }catch(e){
        alert("Authentication error");
        console.error(e);
    }
}

async function refresh() {
    let isRetry = false;
    try{
        const req = await fetch("/api/refresh", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            credentials: "include",
            body: JSON.stringify({host})
        });
        const res = await req.json();
        if(req.status === 401) throw Error();
        localStorage.setItem('token', res.accessToken);
        isAuth = true;
        return true;
        // window.location.href="/";
    }catch(e){
        if(isRetry){
            console.error(e);
            return false;
        }else{
            try{
                const req = await fetch("/api/refresh", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: "include",
                    body: JSON.stringify({host})
                });
                const res = await req.json();
                if(req.status === 401) throw Error();
                localStorage.setItem('token', res.accessToken);
                isAuth = true;
                return true;
            }catch(e){
                console.error(e);
                return false;
            }
        }
    }
}

async function logout() {
    try{
        await fetch("/api/logout", {
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({host})
        });
        localStorage.removeItem('token');
        isAuth = false;
        window.location.href="/login.html";
    }catch(e){
        console.error(e);
    }
}

async function onloadfunc() {
    isAuth = await refresh();

    const userData = await Api.get();
    document.getElementById("email_value").textContent = userData.email;
    document.getElementById("coins_value").textContent = userData.coins;

    if(isAuth){
        [...document.getElementsByClassName("login")].forEach(e => e.style.display = "");
        [...document.getElementsByClassName("logout")].forEach(e => e.style.display = "none");
    }else{
        [...document.getElementsByClassName("login")].forEach(e => e.style.display = "none");
        [...document.getElementsByClassName("logout")].forEach(e => e.style.display = "");
    }
}

