import { addObjectToCache } from '../../common/plugin-element-cache.js';
import {
  getValidFields,
  validFieldsCacheKey,
} from '../../common/valid-fields.js';
import pluginInfo from '../../plugin-manifest.json';
import { getSchema, getValidator } from './settings-schema.js';

let configCache = null;

export const handleManagePlugin = ({ plugin, contentTypes, modalInstance }) => {
  if (plugin?.id !== pluginInfo.id) return null;

  if (configCache) return configCache;

  const validFields = getValidFields(contentTypes);
  addObjectToCache(validFieldsCacheKey, validFields);

  const ctds = contentTypes
    ?.filter(({ internal }) => !internal)
    ?.map(({ name, label }) => ({ value: name, label }));

  const { titleFieldsKeys, leadFieldsKeys, sourceFieldsKeys, faqFieldsKeys } =
    validFields;

  configCache = {};

  configCache = {
    options: {
      disbaledBuildInValidation: true,
      onValidate: getValidator(
        titleFieldsKeys,
        leadFieldsKeys,
        sourceFieldsKeys,
        faqFieldsKeys,
      ),
    },
    schema: getSchema(ctds),
  };

  modalInstance.promise.then(() => (configCache = null));

  return configCache;
};
