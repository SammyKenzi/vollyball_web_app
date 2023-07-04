//四捨五入
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

//player_number
var btn_player_num = document.getElementById('button');
//var player_name = document.getElementById('player_name')
btn_player_num.addEventListener('click', function(){
    var player_num = document.getElementById('player_num');
    var num = player_num.value;
    name_box(Number(num));

});

function name_box(num){
    var names = [];
    //Create name_box
    var name_text = document.getElementById('name_box');
    name_text.innerHTML = '名前を入力';
    for(var i=0;i<num;i++){
        names[i] = document.createElement('input');
        names[i].type = 'text';
        name_text.appendChild(names[i]);
    }
    var btn_name_text = document.createElement('button');
    btn_name_text.textContent = '決定';
    name_text.appendChild(btn_name_text);
    btn_name_text.addEventListener('click', function(){
        for(var i=0;i<num;i++){
            names[i] = names[i].value;
        }
        var element = document.getElementById('player');
        var element2 = document.getElementById('name_box');
        element.remove();
        element2.remove();
        creating_table(num, names);
    });

}

function creating_table(num, names){
    //Creating table
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    //Creating btn
    var btns = [];
    var btn = [];
    command = [];
    for(var i=0;i<num;i++){
        btns.push([]);
        btn.push([]);
    }
    //thead
    //1
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.rowSpan = '2';
    th1.innerHTML = '名前';
    var th2 = document.createElement('th');
    th2.colSpan = '4'
    th2.innerHTML = 'サーブ';
    var th3 = document.createElement('th');
    th3.colSpan = '5';
    th3.innerHTML = 'スパイク';
    var th4 = document.createElement('th');
    th4.rowSpan = '2';
    th4.innerHTML = '名前';
    var th5 = document.createElement('th');
    th5.colSpan = '4';
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
    var list = ['打数','SA','効果','ミス','打数','決定','ミス','被B','被B(失点)','本数','A','B','C','ラリー','得点'];
    var tr = document.createElement('tr');
    for(var i=0;i<list.length;i++){
        var th = document.createElement('th');
        th.innerHTML = list[i];
        tr.appendChild(th);
    }
    thead.appendChild(tr);

    table.appendChild(thead);
    //tbody
    for(var i=0;i<num;i++){
        var tr = document.createElement('tr');
        for(var j=0;j<list.length+2;j++){
            var th = document.createElement('th');
            //Create btn
            if(j!=0 & j!=10){
                btns[i][j] = document.createElement('button');
                btns[i][j].innerHTML = 0;
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
                    };
                })(i,j));
            th.appendChild(btns[i][j]);
            }
            else{
                var name = document.createElement('text');
                name.innerHTML = names[i];
                th.appendChild(name);
            }
            
            tr.appendChild(th);
        }
    tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.getElementById('table').append(table);

    var undo_btn = document.getElementById('undo');
    undo_btn.addEventListener('click', function(){
        var i = command[command.length-1][0];
        var j = command[command.length-1][1];
        x = Number(btns[i][j].innerHTML);
        x -= 1;
        btns[i][j].innerHTML = x;
        btn[i][j] = x;
        command.pop();
    });
}
