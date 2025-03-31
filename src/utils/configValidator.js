export const validateJsonConfig = (config) => {
    if (!config || !Array.isArray(config.actions)) {
      console.error("Geçersiz JSON formatı: 'actions' dizisi eksik!");
      return false;
    }
  
    const requiredFields = {
      remove: ["selector"],
      replace: ["selector", "newElement"],
      insert: ["target", "element", "position"],
      alter: ["oldValue", "newValue"],
    };
  
    let isValid = true;
  
    config.actions.forEach((action, index) => {
      const requiredKeys = requiredFields[action.type];
  
      if (!requiredKeys) {
        console.error(`Invalid action type: '${action.type}' (Index: ${index})`);
        isValid = false;
        return;
      }
  
      requiredKeys.forEach((key) => {
        if (!action.hasOwnProperty(key)) {
          console.error(
            `Missing field: '${key}' - Action: ${JSON.stringify(action)} (Index: ${index})`
          );
          isValid = false;
        }
      });
    });
  
    return isValid;
  };

export const validateYamlConfig = (config) => {
    if (!config || !Array.isArray(config.actions)) {
      console.error("Invalid YAML format: 'actions' array is missing!");
      return false;
    }
  
    const requiredFields = {
      remove: ["selector"],
      replace: ["selector", "newElement"],
      insert: ["target", "element", "position"],
      alter: ["oldValue", "newValue"],
    };
  
    let isValid = true;
  
    config.actions.forEach((action, index) => {
      const requiredKeys = requiredFields[action.type];
  
      if (!requiredKeys) {
        console.error(`Invalid action type: '${action.type}' (Index: ${index})`);
        isValid = false;
        return;
      }
  
      requiredKeys.forEach((key) => {
        if (!action.hasOwnProperty(key)) {
          console.error(
            `Missing field: '${key}' - Action: ${JSON.stringify(action)} (Index: ${index})`
          );
          isValid = false;
        }
      });
    });
  
    return isValid;
  };
  