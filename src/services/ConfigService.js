import axios from "axios";
import yaml from "yaml";
import { validateYamlConfig, validateJsonConfig } from "../utils/ConfigValidator";

const API_BASE_URL = "http://localhost:8080/api/v1";

const USERNAME = "admin";
const PASSWORD = "admin";
const authHeader = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;

export const fetchConfig = async (configId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/configurations/${configId}`, {
      headers: {
        Authorization: authHeader,
      },
    });

    const jsonConfig = response.data;
    if (!validateJsonConfig(jsonConfig)) {
      console.error("JSON configuration is incorrect, no operation.");
      return null;
    }

    return jsonConfig;
  } catch (error) {
    console.error("Error taking configuration:", error);
    return null;
  }
};

export const loadYamlFromResources = async (configId) => {
  try {
    const filename = "CONFIG_" + configId + ".yaml";
    const response = await fetch(`/resources/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to load YAML file: ${filename}`);
    }

    const yamlText = await response.text();
    const parsedConfig = yaml.parse(yamlText);
    if (!validateYamlConfig(parsedConfig)) {
      console.error("JSON configuration is incorrect, no operation.");
      return null;
    }

    return parsedConfig
  } catch (error) {
    console.error("Error reading YAML file:", error);
    return null;
  }
};

export const getAllSpecificConfigs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/specific-configurations`, {
      headers: {
        Authorization: authHeader,
      },
    });

    return response.data;

  } catch (error) {
    console.error("Error taking configuration:", error);
    return null;
  }
};

export const getRandomConfigId = (datasource) => {
  let allValues = [];
  
  Object.keys(datasource).forEach((key) => {
    const category = datasource[key];
    if (typeof category === "object" && category !== null) {
      Object.values(category).forEach((k) => {
        if (typeof k === "object" && k !== null) {
          Object.values(k).forEach((v) => {
            if (Array.isArray(v)) {
              allValues = allValues.concat(v);
            }
          });
        }
        if (Array.isArray(k)) {
          allValues = allValues.concat(k);
        }
      });
    }
  });

  return allValues[Math.floor(Math.random() * allValues.length)];
};