//四捨五入
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

//player_number
var btn_player_num = document.getElementById('button');
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
    var btn =[];
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

    var btn_complete = document.createElement('button');
    btn_complete.innerHTML = '入力確定';
    btn_complete.addEventListener('click', function(){
        var new_list = [];
        for(var i=0;i<num;i++){
            new_row = [];
            for(var j=0;j<22;j++){
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
                            new_row.push(0);
                        }
                        else{
                            new_row.push(financial((btn[i][2]+btn[i][3])/btn[i][1]*100));
                        }
                        break;
                    case 6:
                        if(btn[i][1]==0){
                            new_row.push(0);
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
                            new_row.push(0);
                        }
                        else{
                            new_row.push(financial(btn[i][6]/btn[i][5]*100));
                        }
                        break;
                    case 13:
                        if(btn[i][5]==0){
                            new_row.push(0);
                        }
                        else{
                            new_row.push(financial(btn[i][7]/btn[i][5]*100));
                        }
                        break;
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                        new_row.push(btn[i][j-4]);
                        break;
                    case 19:
                        if(btn[i][10]==0){
                            new_row.push(0);
                        }
                        else{
                            new_row.push(financial((btn[i][11]+btn[i][12]/2+btn[i][13]/3)/btn[i][10]*100));
                        }
                        break;
                    case 20:
                    case 21:
                        new_row.push(btn[i][j-5]); 
                        break;               
                }
            }
            new_list.push(new_row);
        }
        var element = document.getElementById('table');
        element.remove();
        creating_new_table(new_list);
        
    });
    table.appendChild(btn_complete);
}

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
    th5.colSpan = '5';
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
    var list = ['打数','SA','効果','ミス','効果率','ミス率','打数','決定','ミス','被B','被B(失点)','決定率','ミス率','本数','A','B','C','成功率','ラリー','得点'];
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
        for(var j=0;j<new_list[0].length;j++){
            var th = document.createElement('th');

            th.innerHTML = new_list[i][j];
            tr.appendChild(th);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    document.getElementById('body').append(table);
}

