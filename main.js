//////////////// Drag and Drop Code (used WebDev Simplified Drag and Drop Tutorial code for this) ////////////////

const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const menus = document.querySelectorAll(".menu");
var dragParentContainer = null
var currentDragTarget = null
console.log(currentDragTarget)
draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", (e) => {
    draggable.classList.add("dragging");
    e.dataTransfer.setData("text", e.target.dataset.currdrag);
    console.log("dragstart");
    console.log(e.target.parentNode)
    dragParentContainer = e.target.parentNode
    currentDragTarget = e.target
    console.log('mydrag',currentDragTarget)
    // if(e.target.parentNode.classList.contains('container')){
    //   console.log('here now', e.target.parentNode)
    //   // e.target.parentNode.textContent = 'Drop'
    // }
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    const afterElement = getDragAfterElement(container, e.clientY);
    //const draggable = document.querySelector(".dragging");
    let mydata = e.dataTransfer.getData("text");
    console.log(mydata);
    let draggable = document.querySelector(`[data-currdrag="${mydata}"]`);
    console.log(afterElement);
    if (afterElement == null) {
      container.innerHTML = "";
      container.appendChild(draggable);
      draggable.style.margin = "0";
      getBtnTxt(draggable); // This code is mine
    } else {
      container.insertBefore(draggable, afterElement);
      getBtnTxt(draggable); // This code is mine
    }

    console.log("drag over");
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

menus.forEach((menu) => {
  menu.addEventListener("dragover", (e) => {
    const afterElement = getDragAfterElementMenu(menu, e.clientY);

    const draggable = document.querySelector(".dragging");
    console.log(afterElement);
    if (afterElement == null) {
      menu.appendChild(draggable);
      draggable.style.margin = "10px 30px";
      containers.forEach((container) => {
        container.innerHTML = "Drop";
      });
      removeBtnText(draggable); // This code is mine
    } else {
      menu.insertBefore(draggable, afterElement);
      draggable.style.margin = "10px 30px";
      // containers.forEach((container) => {
      //   container.innerHTML = "Drop";
      // });
      
      
       // This code is mine
    }
    if(dragParentContainer.classList.contains('container')){
      //console.log('here now', dragParentContainer)
      dragParentContainer.textContent = 'Drop'
    }
    removeBtnText(currentDragTarget)
    console.log("drag over");
  });
});

function getDragAfterElementMenu(menu, y) {
  const draggableElements = [
    ...menu.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      console.log(offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// //////////////// Getting the text of a button (used to identify chosen user buttons) ////////////////
// // This code is mine

var btnNames = []; // For getBtnTxt function

function getBtnTxt(currBtn) {
  let btnTxt = currBtn.textContent.trim();
  if (!btnNames.includes(btnTxt)) {
    btnNames.push(btnTxt);
  }
  console.log(btnNames);
}

function removeBtnText(currBtn) {
  console.log('here', currBtn)
  let btnTxt = currBtn.textContent.trim();
   
  if (btnNames.includes(btnTxt)) {
    index = btnNames.indexOf(btnTxt);
    btnNames.splice(index, index + 1);
  }
  console.log(btnNames);
}

// // //////////////// Next Button Event Listener ////////////////

// // var nextBtn = document.querySelector(".choose-btns-next-btn");

// // nextBtn.addEventListener("click", postUserBtns);

// // function postUserBtns() {
// //   btnNamesStr = btnNames.join();

// //   console.log(btnNamesStr);

// //   const localStorage = window.localStorage;

// //   localStorage.setItem("btnNames", btnNamesStr);
// // }

// // // var btn = document.querySelector(".welcome-btn");
// // // var txt = btn.textContent;
// // // var txts = btn.innerText;

// // // console.log(txt);
// // // console.log(txts);

// /*new code start below this line*/

// const draggables = document.querySelectorAll(".draggable");
// const containers = document.querySelectorAll(".container");
// const menus = document.querySelectorAll(".menu");
// console.log(menus);
// draggables.forEach((draggable) => {
//   draggable.addEventListener("dragstart", (dragevent) => {
//     console.log(dragevent.target);
//     dragevent.dataTransfer.setData("text", dragevent.target.dataset.currdrag);
//   });
// });

// containers.forEach((container) => {
//   container.addEventListener("drop", (dropevent) => {
//     dropevent.preventDefault();
//     let mydata = dropevent.dataTransfer.getData("text");
//     console.log(mydata);
//     let dropBox = document.querySelector(`[data-currdrag="${mydata}"]`);
//     console.log(dropBox.textContent);
//     dropBox.style.margin = "0";
//     dropBox.classList.add("dragging");
//     dropevent.target.innerHTML = " ";
//     dropevent.target.appendChild(dropBox);
//     dropBox.classList.add("dragging");
//     getBtnTxt(dropBox);
//   });

//   container.addEventListener("dragover", (allowdropevent) => {
//     //draggable.classList.remove("dragging");
//     allowdropevent.target.style.color = "blue";
//     allowdropevent.preventDefault();
//   });
// });

// menus.forEach((menu) => {
//   menu.addEventListener("dragover", (e) => {
//     console.log("iamhere");
//     const afterElement = getDragAfterElementMenu(menu, e.clientY);
//     const draggable = document.querySelector(".dragging");
//     // let mydata = e.dataTransfer.getData("text");
//     // console.log(mydata);
//     // let draggable = document.querySelector(`[data-currdrag="${mydata}"]`);
//     console.log(afterElement);
//     if (afterElement == null) {
//       menu.appendChild(draggable);
//       draggable.classList.remove("dragging");
//       removeBtnText(draggable); // This code is mine
//     } else {
//       menu.insertBefore(draggable, afterElement);
//       draggable.classList.remove("dragging");
//       removeBtnText(draggable); // This code is mine
//     }

//     console.log("drag over");
//   });
// });
