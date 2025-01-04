//変数の初期化
let untyped = '';
let typed = '';  //入力済み文字列
let score = 0;

//必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');  //入力済み文字列を表示するためのHTML要素
const wrap = document.getElementById('wrap'); //id「wrap」を取得
const start = document.getElementById('start');
const count = document.getElementById('count');
const nowscore = document.getElementById('nowscore');

//テキストの配列
const textLists = [
  'es con field hokkaido' , 'rakuten mobile park miyagi' ,
  'belluna dome' , 'zozo marin stadium' , 
  'kyocera dome osaka' , 'fukuoka mizuho pay pay dome' ,
  'tokyo dome' , 'meiji jingu sutadium' ,
  'yokohama stadium' , 'vantelin dome nagoya' ,
  'koshien stadium' , 'mazda zoom-zoom stadium' ,
  'fighters' , 'eagles' , 'lions' ,
  'marines' , 'buffaloes' , 'hawks' ,
  'giants' , 'swallows' , 'baystars' ,
  'dragons' , 'tigers' , 'carp' ,
  'hokkaido' , 'miyagi' , 'saitama' ,
  'chiba' , 'osaka' , 'fukuoka' ,
  'tokyo' , 'kanagawa' , 'aichi' , 'hyogo' , 'hiroshima'
];

//ランダムなテキストを表示
const createText = () => {
  //正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  //配列のインドックス数からランダムな数値を生成する
  let random = (Math.floor(Math.random()*textLists.length));

  //配列からランダムにテキストを取得し、画面に表示する
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};

//キー入力の判定
const keyPress = e => {

  //誤タイプの場合
  if (e.key !== untyped.substring(0,1)){ //入力された文字「e.key」と変数untypedの頭文字を比較し、不一致の場合
    wrap.classList.add('mistyped');      //id「wrap」にclass「misstyped」を追加(id取得済)

    //0.1秒後にid「wrap」にclass「misstyped」を消去
    setTimeout(() => {                   
      wrap.classList.remove('mistyped'); 
    } , 100);                           

    return;                              //処理を終了する「return」を返す
  }

  //正タイプの場合
  score ++;                           //スコアに＋1する
  nowscore.textContent = score;       //nowscoreに今のスコアを表示させる
  typed += untyped.substring(0,1);    //変数untypedの頭文字を取得し、変数typedの末尾に追加
  untyped = untyped.substring(1);     //変数untypedに2番目以降の文字列を再代入
  typedfield.textContent = typed;     //定数typedfieldのtextContentプロパティに変数typedを代入
  untypedfield.textContent = untyped; //定数untypedfieldのtextContentプロパティに変数untypedを代入

  //テキストがなくなったら新しいテキストを表示
  if (untyped === ''){
    createText();
  }
};

//タイピングスキルのランクの判定
const rankCheck = score => {

  //テキストを格納する変数
  let text = '';

  //スコアに応じて異なるメッセージを変数textに格納する
  if (score < 100){
    text = `Cランクでした。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200){
    text = `Bランクでした。\nAランクまであと${200 - score}文字です。`;
  } else if(score < 300){
    text = `Aランクでした。\nSランクまであと${300 - score}文字です。`;
  } else if(score >= 300){
    text = `Sランクです!\nおめでとうございます!`;
  }

  return `${score}文字打てました！\n${text}\n【OK】リトライ\n【キャンセル】終了`;
};

//ゲームを終了
const gameOver = id => {
  clearInterval(id);
  const result = confirm(rankCheck(score));

  //OKボタンをクリックされたらリロードする
  if (result == true){
    window.location.reload();
  }
};

//カウントダウンタイマー
const timer = () => {
  let time = count.textContent;  //タイマー部分のHTML要素(p)を取得
  const id = setInterval(() => {

    //カウントダウン
    time--;                    //HTML要素(p)の値を1ずつ減らす
    count.textContent = time;  //それを画面に表示させる

    //カウントが0になったらタイマーを停止する
    if (time <= 0){
      gameOver(id);
    }
  } , 1000);
};

//ゲームスタート時の処理
start.addEventListener('click' , () => {
  timer();                                           //カウントダウンタイマーの開始
  createText();                                      //ランダムなテキストを表示
  start.style.display = 'none';                      //スタート開始時、スタートボタンを非表示にする
  nowscore.style.display = 'block';
  document.addEventListener('keypress' , keyPress);  //キーボードのイベント処理
})

untypedfield.textContent = 'スタートボタンで開始';