import pluginInfo from '../plugin-manifest.json';

export const validTitleFields = ['text'];
export const validLeadFields = ['text', 'textarea'];
export const validSourceFields = ['richtext'];
export const validFaqFields = ['object'];

export const getValidFields = (contentTypes) => {
  const sourceFields = {};
  const sourceFieldsKeys = {};

  const titleFields = {};
  const titleFieldsKeys = {};

  const leadFields = {};
  const leadFieldsKeys = {};

  const faqFields = {};
  const faqFieldsKeys = {};

  contentTypes
    ?.filter(({ internal }) => !internal)
    ?.map(({ name, label }) => ({ value: name, label }));

  (contentTypes || []).forEach(({ name, metaDefinition }) => {
    sourceFields[name] = [];
    sourceFieldsKeys[name] = [];

    titleFields[name] = [];
    titleFieldsKeys[name] = [];

    leadFields[name] = [];
    leadFieldsKeys[name] = [];

    faqFields[name] = [];
    faqFieldsKeys[name] = [];

    Object.entries(metaDefinition?.propertiesConfig || {}).forEach(
      ([key, fieldConfig]) => {
        const inputType = fieldConfig?.inputType;

        if (validTitleFields?.includes(inputType)) {
          titleFields[name].push({ value: key, label: fieldConfig.label });
          titleFieldsKeys[name].push(key);
        }

        if (validLeadFields?.includes(inputType)) {
          leadFields[name].push({ value: key, label: fieldConfig.label });
          leadFieldsKeys[name].push(key);
        }

        if (validSourceFields?.includes(inputType)) {
          sourceFields[name].push({ value: key, label: fieldConfig.label });
          sourceFieldsKeys[name].push(key);
        }

        if (validFaqFields?.includes(inputType)) {
          const containsQuestion = Object.entries(
            fieldConfig.items?.propertiesConfig || {},
          ).some(
            ([key, value]) =>
              key === 'question' &&
              ['text', 'textarea'].includes(value.inputType),
          );

          const containsAnswer = Object.entries(
            fieldConfig.items?.propertiesConfig || {},
          ).some(
            ([key, value]) =>
              key === 'answer' &&
              ['text', 'textarea'].includes(value.inputType),
          );

          if (containsQuestion && containsAnswer) {
            faqFields[name].push({ value: key, label: fieldConfig.label });
            faqFieldsKeys[name].push(key);
          }
        }
      },
    );
  });

  return {
    titleFields,
    titleFieldsKeys,
    leadFields,
    leadFieldsKeys,
    sourceFields,
    sourceFieldsKeys,
    faqFields,
    faqFieldsKeys,
  };
};

export const validFieldsCacheKey = `${pluginInfo.id}-form-valid-fields`;
