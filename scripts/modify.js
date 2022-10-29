const modifyBTNzz = document.getElementById("modifyBTN");

const turnonClick = () => {
    const userName = document.getElementById("inputN1").value;
    const school = document.getElementById("inputN2").value;
    const grade = document.getElementById("inputN3").value;
    const CLASS = document.getElementById("inputN4").value;
    const userIdTest = document.getElementById("inputN5").value;
    if((grade != 1 && grade != 2 && grade != 3)){
        const redP = document.getElementById("redP");
        redP.innerText = "잘못된 값을 입력했어요!";
        redP.style.color="red";
    }
    else{
        const redP = document.getElementById("redP");
        redP.innerText = "";
        localStorage.setItem("userName", userName);
        localStorage.setItem("school", school);
        localStorage.setItem("grade", grade);
        localStorage.setItem("CLASS", CLASS);
        localStorage.setItem("UserID", userIdTest);
        const in1 = document.getElementById("in1").value = userName;
        const in2 = document.getElementById("in2").value = school;
        const in3 = document.getElementById("in3").value = grade;
        const in4 = document.getElementById("in4").value = CLASS;
        asyncTest(userName, grade, school, CLASS, userIdTest);
    }
}

function asyncTest(userName, grade,school,CLASS,userIdTest) {
    if(userIdTest != localStorage.getItem("userID")){
        alert("아이디가 다릅니다");
        return;
    }
    else{
        let jsonObj = new Object();
        let jsonArray = new Array();
    
        const userInfo = `${userName}`;
        const putGrade = `${grade}`;
        const putSchool = `${school}`;
        const putClass = `${CLASS}`;
        const putID = `${userIdTest}`;
        const puts = [userInfo, putGrade, putSchool, putClass, putID];
    
        for (let i = 0; i < puts.length; i++) {
            jsonObj.puts = puts[i];
            jsonArray.push(jsonObj);
            jsonObj = {};
        }
        jsonObj.commons = {
            name: userInfo,
            school: putSchool,
            grade: putGrade,
            class: putClass,
            userid: putID,
        };
        jsonArray.push(jsonObj);
    
        let url = 'https://server.the-moment-schema.site/modify';
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonArray),
        })
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.log(err);
            });
    }

}


modifyBTN.addEventListener("click", turnonClick);