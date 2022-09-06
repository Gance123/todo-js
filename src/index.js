import "./styles.css";

const onClickAdd = () => {
  //テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  //未完了リストに追加
  createIncompleteList(inputText);
};

//
//
//
//
//
//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //liタグ生成
  const li = document.createElement("li");
  //div生成
  const div = document.createElement("div");
  div.className = "list-row";
  //pタグ生成
  const p = document.createElement("p");
  p.innerText = text;
  //
  //
  //
  //
  //ボタンタグ生成(完了)
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ（li）を未完了リスト(ul/imconplete-list)から削除
    deleteFromImcompleteList(completeButton);

    //完了リストに追加する要素
    const addTargetDiv = completeButton.parentNode;

    //divの最初の要素<p>のinnerTextを取得・・入力した文字を取得しておく
    const text = addTargetDiv.firstElementChild.innerText;

    //div以下を初期化(p, "完了"button, "削除"buttonを消す)
    addTargetDiv.textContent = null;

    //pタグ生成、追加・・取得しておいた文字を再追加
    const p = document.createElement("p");
    p.innerText = text;
    addTargetDiv.appendChild(p);

    //"戻す"ボタンの追加
    const backbutton = document.createElement("button");
    backbutton.innerText = "戻す";
    div.appendChild(backbutton);
    backbutton.addEventListener("click", () => {
      //backbuttonの親要素<li>を完了リストから削除
      const backTargetDiv = backbutton.parentNode;
      document
        .getElementById("complete-list")
        .removeChild(backTargetDiv.parentNode); //li

      //divの最初の要素<p>のinnerTextを取得・・完了リストでの文字を取得しておく
      const text = backTargetDiv.firstElementChild.innerText;

      //さらに未完了リストに追加する関数を呼び出す・・テキスト内容は完了リストでの取得していた文字
      createIncompleteList(text);
    });

    document
      .getElementById("complete-list")
      .appendChild(addTargetDiv.parentNode); //li
  });
  //
  //
  //
  //ボタンタグ生成(削除)
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ（li）を未完了リスト(ul/imconplete-list)から削除
    deleteFromImcompleteList(deleteButton); //li
  });
  //
  //
  //
  //未完了のリストに追加
  document.getElementById("imcomplete-list").appendChild(li);
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  //
  //
  //未完了リストから指定の要素を削除
  const deleteFromImcompleteList = (target) => {
    const Target = target.parentNode; //渡ってきた引数の親要素div
    document.getElementById("imcomplete-list").removeChild(Target.parentNode); //li
  };
};
//
//
// 1.”未完了リストに追加（関数）”
// 2.未完了リストでのテキスト<p>を取得する
// 3.2(取得しておいたテキスト)をもとに完了リストに追加
// 4.完了リストでのテキスト<p>を取得する
// 5.4を引数に　”未完了リストに追加(関数)”　を実行
//
//"戻す"ボタン内でcreateIncompleteListが呼ばれ、createIncompleteList内で"戻す"ボタン
// が呼ばれているため、ループ状態になる
//
//
//
//
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
