//四捨五入
function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }




function add_row(count){
    var table = document.getElementById('table')
    var tbody = document.getElementById('tbody');
    var tr = document.createElement('tr');
    //push btn_list
    btns.push([]);
    btn.push([]);
    var i = btns.length-1;
    //Create btn
    for(var j=0;j<19;j++){
        var td = document.createElement('td');
        if(j!=0 & j!=11){
            btns[i][j] = document.createElement('button');
            btns[i][j].innerHTML = 0;
            btns[i][j].style.fontSize = '20px';
            if(j == 12){
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
                    if(j > 12 & j < 17){
                        var y = Number(btns[i][12].innerHTML);
                        y += 1;
                        btns[i][12].innerHTML = y;
                        btn[i][12] = y;
                    }
                };
            })(i,j));
            td.appendChild(btns[i][j]);
            tr.appendChild(td);

        }
        else{
            if(j == 0){
                const namebox = document.createElement('input');
                namebox.type = 'text';
                namebox.id = 'namebox_' + count;

                namebox.addEventListener('input', function(event) {
                    const currentTextboxValue = event.target.value;
                    const correspondingTextbox2 = document.getElementById('name_copy_' + count);
                    correspondingTextbox2.value = currentTextboxValue;
                });

                td.appendChild(namebox);
            }
            else if(j == 11){
                const name_copy = document.createElement('input');
                name_copy.type = 'text';
                name_copy.id = 'name_copy_' + count;
                name_copy.disabled = true; // テキストボックスを無効化する

                td.appendChild(name_copy);
            }

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
        
    }
}



//main
function button_again(){
    //player_number
    var btn_player_num = document.getElementById('button');
    btn_player_num.addEventListener('click', function(){ 
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
        if(j > 12 & j < 17){
            var y = Number(btns[i][12].innerHTML);
            y -= 1;
            btns[i][12].innerHTML = y;
            btn[i][12] = y;
        }
        command.pop();
    });
    // 一番下の行を削除するためのボタンを作成
    const deleteLastRowButton = document.getElementById('delete_button');
    deleteLastRowButton.innerHTML = '一番下の行を削除';
    deleteLastRowButton.addEventListener('click', function() {
        const table = document.getElementById('table');
        const rows = table.getElementsByTagName('tr');

        if (rows.length > 2) { // テーブルに1行以上の行がある場合のみ処理を実行
            const confirmation = confirm('一番下の行を削除しますか？'); // 確認アラートを表示

            if (confirmation) {
                const lastRow = rows[rows.length - 1]; // 一番下の行を取得
                lastRow.remove(); // 一番下の行を削除
                count -= 1;
                btns.pop();
                for(var k=0;k<command.length;k++){
                    if(command[k][0] == rows.length-2){
                        command.splice(k, 1);
                        k--;
                    }
                }
            } else {
                // キャンセルされた場合の処理を追加できます
            }
        } else {
            alert('削除できる行がありません');
        }
    });
    
    var btn_complete = document.getElementById('fin');
    btn_complete.addEventListener('click', function(){
        var new_list = [];
        for(var i=0;i<count;i++){
            new_row = [];
            for(var j=0;j<24;j++){
                switch(j){
                    case 0:
                    case 15:
                        const namebox = document.getElementById('namebox_'+i);
                        const inputValue = namebox.value;
                        new_row.push(inputValue);
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
                    case 12:
                        new_row.push(btn[i][j-2]);
                        break;
                    case 13:
                        if(btn[i][5]==0){
                            new_row.push('/');
                        }
                        else{
                            new_row.push(financial(btn[i][6]/btn[i][5]*100));
                        }
                        break;
                    case 14:
                        if(btn[i][5]==0){
                            new_row.push('/');
                        }
                        else{
                            new_row.push(financial(btn[i][7]/btn[i][5]*100));
                        }
                        break;
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                        new_row.push(btn[i][j-4]);
                        break;
                    case 21:
                        if(btn[i][12]==0){
                            new_row.push('/');
                        }
                        else{
                            new_row.push(financial((btn[i][13]+btn[i][14]*0.7+btn[i][15]*0.3)/btn[i][12]*100));
                        }
                        break;
                    case 22:
                    case 23:
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

        var resetButton = document.createElement('button');
        resetButton.textContent = '初期化';

        //プレイヤーを保持して表を初期化
        resetButton.addEventListener('click', function() {
            var tableElement = document.getElementById('aite');

            // 新しい表が存在する場合、その表を削除する
            if (tableElement) {
                tableElement.innerHTML = ''; // 表示されている表の内容を空にすることで削除します
            }
            var container = document.getElementById('body');

            // 復活させたい HTML コード
            var restoredHTML = `
                <p id="aite">対戦相手:<input type="text">　　自<input type="text"> - <input type="text">敵</p>
                <p id="player"><button id="button">プレイヤー追加</button>  <button id="delete_button">プレイヤー削除</button></p>

                <table id="table">
                    <tbody id="tbody">
                        <tr>
                            <th rowspan="2">名前</th>
                            <th colspan="4">サーブ</th>
                            <th colspan="6">スパイク</th>
                            <th rowspan="2">名前</th>
                            <th colspan="5">レセプション</th>
                            <th colspan="2">ブロック</th>
                        </tr>
                        <tr>
                            <th>打数</th>
                            <th>SA</th>
                            <th>効果</th>
                            <th>ミス</th>
                            <th>打数</th>
                            <th>決定</th>
                            <th>ミス</th>
                            <th>CM</th>
                            <th>B(続)</th>
                            <th>B(失)</th>
                            <th>本数</th>
                            <th>A</th>
                            <th>B</th>
                            <th>C</th>
                            <th>D以下</th>
                            <th>続</th>
                            <th>得</th>
                        </tr>
                    </tbody>
                </table>`;

            container.innerHTML = restoredHTML;
            //新しい表を表示

            btns = [];
            btn = [];
            count = 0;

            var restoredHTML2 =`<div>
                <div class="undo"><button id="undo">１つ戻る</button></div>
                <div class="fin"><button id="fin">入力確定</button></div>
                </div>
                <br><br>
                <p id="plus">※補足<br>
                CM   :コンビミス（ミス率に含まない）<br>
                B(続)：失点はしていないけどブロックされた本数<br>
                B(失)：ブロックされて失点した本数<br>
                続   ：得点はしてないけどブロックした本数<br>
                得   ：ブロックで得点した本数
                </p>
                <p id = 'buttonContainer'></p>`;
            var existingHTML = document.getElementById('body').innerHTML;
            var new_restoredHTML = existingHTML + restoredHTML2;
            container.innerHTML = new_restoredHTML;

            button_again();
        });
        var container = document.getElementById('buttonContainer'); // ボタンを追加する要素のIDを取得
        container.appendChild(resetButton); // ボタンを追加する
    });

}

let btns = [];
let btn = [];
let command = [];
var count=0;
let tr = document.createElement('tr');
button_again();



function creating_new_table(new_list){
    //Creating table
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    //1
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    th1.rowSpan = '2';
    th1.innerHTML = '名前';
    var th2 = document.createElement('th');
    th2.colSpan = '6'
    th2.innerHTML = 'サーブ';
    var th3 = document.createElement('th');
    th3.colSpan = '8';
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
    tbody.appendChild(tr);

    //2
    var list = ['打数','SA','効果','ミス','効果率','ミス率','打数','決定','ミス','CM','B(続)','B(失)','決定率','ミス率','本数','A','B','C','D以下','成功率','続','得'];
    var tr = document.createElement('tr');
    for(var i=0;i<list.length;i++){
        var th = document.createElement('th');
        th.innerHTML = list[i];
        tr.appendChild(th);
    }
    tbody.appendChild(tr);
    table.appendChild(tbody);

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
    document.getElementById('aite').append(table);

}