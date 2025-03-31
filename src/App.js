import { useEffect, useState } from "react";
import { fetchConfig, loadYamlFromResources, getAllSpecificConfigs, getRandomConfigId } from "./services/ConfigService";
import { applyConfigActions } from "./utils/domManipulator";

function App() {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    const loadConfig = async () => {

      const allSpecificConfigs = await getAllSpecificConfigs();
      const configDataFromApi = await fetchConfig(getRandomConfigId(allSpecificConfigs));
      const configDataFromYaml = await loadYamlFromResources("3a6042d5-5dea-42c7-9ec1-055400f5113c");
  
      const allActions = [
        ...(configDataFromApi?.actions || []),
        ...(configDataFromYaml?.actions || [])
      ];
  
      const uniqueActions = [];
      const seenActions = new Set();
  
      allActions.forEach(action => {
        const actionKey = JSON.stringify(action);
        if (!seenActions.has(actionKey)) {
          seenActions.add(actionKey);
          uniqueActions.push(action);
        }
      });
  
      if (uniqueActions.length > 0) {
        setConfig({ actions: uniqueActions });
        applyConfigActions(uniqueActions);
      }
    };
  
    loadConfig();
  }, []);

  return (
    <div id="app-container">
      <h1>Dynamic DOM Manipulation</h1>
      <div id="old-header">Machine Learning</div>
      <div id="old-header2">Machine Learning</div>
      <div className="ad-banner">Ad Banner</div>
      <div className="ad-banner2">ML</div>
      <div>
        <p>Some content here...</p>
        <p>Machine Learning is changing the world!</p>
      </div>
    </div>
  );
}

export default App;