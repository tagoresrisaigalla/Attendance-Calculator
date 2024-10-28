let submit_details = document.querySelector(".submit-details");
let submit_percentage = document.querySelector(".submit-percentage");
let submit_hours = document.querySelector(".submit-hours");

let percentageDisplay = document.querySelector("p");
let left_title = document.querySelector(".left-bar h1")

document.addEventListener('DOMContentLoaded', function() {
    if (submit_details) {
        submit_details.addEventListener("touchend",()=>{
            const x = parseFloat(document.querySelector("#attended").value);
            const y = parseFloat(document.querySelector("#conducted").value);
            if(y==0 || x==0 || x>y || isNaN(x) || isNaN(y)){
                alert("Enter Valid Number")
            }
            else{
                const percentage = (Math.round(x/y * 10000) / 100).toFixed(2);
                localStorage.setItem('percentage', percentage);
                localStorage.setItem('x', x);
                localStorage.setItem('y', y);      
                window.location.href = "main.html";
            }
        })
    }

    if(percentageDisplay){
        const percentage = localStorage.getItem('percentage');
        percentageDisplay.innerText = percentage;
    }

    if(submit_hours){
        submit_hours.addEventListener("touchend",()=>{
            let k = parseFloat(document.querySelector("#bunk").value);
            let l = parseFloat(document.querySelector("#attend").value);
            if(isNaN(k)){k=0};
            if(isNaN(l)){l=0};
            const x = parseFloat(localStorage.getItem('x'));
            const y = parseFloat(localStorage.getItem('y')); 
            let result_percentage = (Math.round((x+l)/(y+k+l) * 10000) / 100).toFixed(2);
            percentageDisplay.innerText = result_percentage;
            left_title.innerText = "Your Updated Percentage will be..."

        })
    }

    if(submit_percentage){
        submit_percentage.addEventListener("touchend",()=>{
            const i = parseFloat(document.querySelector("#percentage").value)/100;
            if(i==0 || isNaN(i)){
                alert("Enter Valid Number")
            }
            if(i>=1){
                alert("Now u can't get 100 or More...")
            }
            else{
                const x = parseFloat(localStorage.getItem('x'));
                const y = parseFloat(localStorage.getItem('y'));
                let result;
                if(x/y>i){
                    left_title.innerText = "You can bunk..."
                    result = Math.floor((x-i*y)/(i));
                }
                else{
                    left_title.innerText = "You need to attend..."
                    result = Math.ceil((i*y-x)/(1-i));
                } 
                
                if(result >= 6){
                    result = Math.ceil(result/6);
                    percentageDisplay.innerHTML = `<p>${result}<span style="font-size: 1.5rem">days...</span></p>`;
                }
                else{
                    percentageDisplay.innerHTML = `<p>${result}<span style="font-size: 1.5rem">hrs...</span></p>`;
                }
            }
        })
    }

});
