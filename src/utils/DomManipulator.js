export const applyConfigActions = (actions) => {
    actions.forEach((action) => {
      switch (action.type) {
        case "remove":
          document.querySelectorAll(action.selector).forEach((el) => el.remove());
          break;
  
        case "replace":
          document.querySelectorAll(action.selector).forEach((el) => {
            const newElement = document.createElement("div");
            newElement.innerHTML = action.newElement;
            el.replaceWith(newElement.firstChild);
          });
          break;
  
        case "insert":
          document.querySelectorAll(action.target).forEach((el) => {
            const newElement = document.createElement("div");
            newElement.innerHTML = action.element;
            if (action.position === "after") {
              el.insertAdjacentElement("afterend", newElement.firstChild);
            } else if (action.position === "before") {
              el.insertAdjacentElement("beforebegin", newElement.firstChild);
            }
          });
          break;
  
        case "alter":
          document.body.innerHTML = document.body.innerHTML.replace(
            new RegExp(action.oldValue, "g"),
            action.newValue
          );
          break;
  
        default:
          console.warn("Unknown action type:", action.type);
      }
    });
  };
