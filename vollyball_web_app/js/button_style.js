//四捨五入
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
function add_row(count){
    var table = document.getElementById('table')
    var tr = document.createElement('tr');
    //push btn_list
    btns.push([]);
    btn.push([]);
    var i = btns.length-1;
    //Create btn
    for(var j=0;j<18;j++){
        var td = document.createElement('td');
        if(j!=0 & j!=10){
            btns[i][j] = document.createElement('button');
            btns[i][j].innerHTML = 0;
            btns[i][j].style.fontSize = '20px';
            if(j == 11){
                btns[i][j].disabled = true;
            }
            var x = 0;
            btn[i][j] = 0;
            btn[i].push(0);
            btns[i][j].addEventListener('click', (function(i,j){
                return function(){
                    x = Number(btns[i][j].innerHTML);
                    x += 1;
                    btns[i][j].innerHTML = x;
                    btn[i][j] = x;
                    command.push([i,j]);
                    if(j > 11 & j < 16){
                        var y = Number(btns[i][11].innerHTML);
                        y += 1;
                        btns[i][11].innerHTML = y;
                        btn[i][11] = y;
                    }
                };
            })(i,j));
            td.appendChild(btns[i][j]);
            tr.appendChild(td);
        }
        else{
            var cellText = document.createTextNode(names[count]);
            td.appendChild(cellText);
            tr.appendChild(td);
        }
    }
    table.appendChild(tr);
}


//main

let btns = [];
let btn = [];
let command = [];
let names = [];
let tr = document.createElement('tr');

//player_number
var count=0;
var btn_player_num = document.getElementById('button');
btn_player_num.addEventListener('click', function(){
    var name = document.getElementById('player_into');
    names[count] = name.value;   
    add_row(count);
    count += 1;
});

//undo_btn
var undo_btn = document.getElementById('undo');
undo_btn.addEventListener('click', function(){
    var i = command[command.length-1][0];
    var j = command[command.length-1][1];
    x = Number(btns[i][j].innerHTML);
    x -= 1;
    btns[i][j].innerHTML = x;
    btn[i][j] = x;
    if(j > 11 & j < 16){
        var y = Number(btns[i][11].innerHTML);
        y -= 1;
        btns[i][11].innerHTML = y;
        btn[i][11] = y;
    }
    command.pop();
});


var btn_complete = document.getElementById('fin');
btn_complete.addEventListener('click', function(){
    var new_list = [];
    for(var i=0;i<names.length;i++){
        new_row = [];
        for(var j=0;j<23;j++){
            switch(j){
                case 0:
                case 14:
                    new_row.push(names[i]);
                    break;
                case 1:
                case 2:
                case 3:
                case 4:
                    new_row.push(btn[i][j]);
                    break;
                case 5:
                    if(btn[i][1]==0){
                        new_row.push('/');
                    }
                    else{
                        new_row.push(financial((btn[i][2]+btn[i][3])/btn[i][1]*100));
                    }
                    break;
                case 6:
                    if(btn[i][1]==0){
                        new_row.push('/');
                    }
                    else{
                        new_row.push(financial(btn[i][4]/btn[i][1]*100));
                    }
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                case 11:
                    new_row.push(btn[i][j-2]);
                    break;
                case 12:
                    if(btn[i][5]==0){
                        new_row.push('/');
                    }
                    else{
                        new_row.push(financial(btn[i][6]/btn[i][5]*100));
                    }
                    break;
                case 13:
                    if(btn[i][5]==0){
                        new_row.push('/');
                    }
                    else{
                        new_row.push(financial(btn[i][7]/btn[i][5]*100));
                    }
                    break;
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                    new_row.push(btn[i][j-4]);
                    break;
                case 20:
                    if(btn[i][11]==0){
                        new_row.push('/');
                    }
                    else{
                        new_row.push(financial((btn[i][12]+btn[i][13]*0.7+btn[i][14]*0.3)/btn[i][11]*100));
                    }
                    break;
                case 21:
                case 22:
                    new_row.push(btn[i][j-5]); 
                    break;               
            }
        }
        new_list.push(new_row);
    }
    var element = document.getElementById('table');
    var element2 = document.getElementById('player');
    var element3 = document.getElementById('undo');
    var element4 = document.getElementById('fin');
    element.remove();
    element2.remove();
    element3.remove();
    element4.remove();
    creating_new_table(new_list);
});

function creating_new_table(new_list){
    //Creating table
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    //thead
    //1
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.rowSpan = '2';
    th1.innerHTML = '名前';
    var th2 = document.createElement('th');
    th2.colSpan = '6'
    th2.innerHTML = 'サーブ';
    var th3 = document.createElement('th');
    th3.colSpan = '7';
    th3.innerHTML = 'スパイク';
    var th4 = document.createElement('th');
    th4.rowSpan = '2';
    th4.innerHTML = '名前';
    var th5 = document.createElement('th');
    th5.colSpan = '6';
    th5.innerHTML = 'レセプション';
    var th6 = document.createElement('th');
    th6.colSpan = '2';
    th6.innerHTML = 'ブロック';


    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    thead.appendChild(tr);

    //2
    var list = ['打数','SA','効果','ミス','効果率','ミス率','打数','決定','ミス','B(続)','B(失)','決定率','ミス率','本数','A','B','C','D以下','成功率','続','得'];
    var tr = document.createElement('tr');
    for(var i=0;i<list.length;i++){
        var th = document.createElement('th');
        th.innerHTML = list[i];
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    //tbody
    for(var i=0;i<new_list.length;i++){
        var tr = document.createElement('tr');
        console.log(new_list[0])
        for(var j=0;j<new_list[0].length;j++){
            var th = document.createElement('th');

            th.innerHTML = new_list[i][j];
            tr.appendChild(th);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.getElementById('aite').append(table);
}