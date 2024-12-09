import i18n from '../../i18n';
import pluginInfo from '../../plugin-manifest.json';
import {
  validFaqFields,
  validLeadFields,
  validSourceFields,
  validTitleFields,
} from '../../common/valid-fields.js';

export const getSchema = (contentTypes) => ({
  id: pluginInfo.id,
  name: pluginInfo.id,
  label: pluginInfo.name,
  internal: false,
  schemaDefinition: {
    type: 'object',
    allOf: [
      {
        $ref: '#/components/schemas/AbstractContentTypeSchemaDefinition',
      },
      {
        type: 'object',
        properties: {
          surferSeoAnalyzer: {
            type: 'array',
            items: {
              type: 'object',
              required: ['content_type', 'source'],
              properties: {
                content_type: {
                  type: 'string',
                  minLength: 1,
                },
                title: {
                  type: 'string',
                  minLength: 1,
                },
                lead: {
                  type: 'string',
                  minLength: 1,
                },
                source: {
                  type: 'string',
                  minLength: 1,
                },
                faq: {
                  type: 'string',
                  minLength: 1,
                },
              },
            },
          },
        },
      },
    ],
    required: [],
    additionalProperties: false,
  },
  metaDefinition: {
    order: ['surferSeoAnalyzer'],
    propertiesConfig: {
      surferSeoAnalyzer: {
        items: {
          order: ['content_type', 'source', 'title', 'lead', 'faq'],
          propertiesConfig: {
            content_type: {
              label: i18n.t('ContentType'),
              unique: false,
              helpText: i18n.t('ContentTypeHelpText'),
              inputType: 'select',
              optionsWithLabels: contentTypes,
              useOptionsWithLabels: true,
            },
            source: {
              label: i18n.t('Source'),
              unique: false,
              helpText: i18n.t('SourceHelpText', {
                types: validSourceFields.join(', '),
              }),
              inputType: 'select',
              options: [],
            },
            title: {
              label: i18n.t('Title'),
              unique: false,
              helpText: i18n.t('TitleHelpText', {
                types: validTitleFields.join(', '),
              }),
              inputType: 'select',
              options: [],
            },
            lead: {
              label: i18n.t('Lead'),
              unique: false,
              helpText: i18n.t('LeadHelpText', {
                types: validLeadFields.join(', '),
              }),
              inputType: 'select',
              options: [],
            },
            faq: {
              label: i18n.t('Faq'),
              unique: false,
              helpText: i18n.t('FaqHelpText', {
                types: validFaqFields.join(', '),
              }),
              inputType: 'select',
              options: [],
            },
          },
        },
        label: i18n.t('Configure'),
        unique: false,
        helpText: '',
        inputType: 'object',
      },
    },
  },
});

const addToErrors = (errors, index, field, error) => {
  if (!errors.surferSeoAnalyzer) errors.surferSeoAnalyzer = [];
  if (!errors.surferSeoAnalyzer[index]) errors.surferSeoAnalyzer[index] = {};
  errors.surferSeoAnalyzer[index][field] = error;
};

export const getValidator = (
  titleFieldsKeys,
  leadFieldsKeys,
  sourceFieldsKeys,
  faqFieldsKeys,
) => {
  return (values) => {
    const errors = {};
    values.surferSeoAnalyzer?.forEach((settings, index) => {
      const { content_type } = settings;

      const requiredFields = ['content_type', 'source'];

      requiredFields.forEach((requiredField) => {
        if (!settings[requiredField]) {
          addToErrors(errors, index, requiredField, i18n.t('FieldRequired'));
        }
      });

      const validTypes = [
        { key: 'title', validFieldsKeys: titleFieldsKeys[content_type] },
        { key: 'lead', validFieldsKeys: leadFieldsKeys[content_type] },
        { key: 'source', validFieldsKeys: sourceFieldsKeys[content_type] },
        { key: 'faq', validFieldsKeys: faqFieldsKeys[content_type] },
      ];

      validTypes.forEach(({ key, validFieldsKeys }) => {
        const value = settings[key];

        if (Array.isArray(value)) {
          if (
            value &&
            value?.length > 0 &&
            !value.every((element) => validFieldsKeys.includes(element || []))
          ) {
            addToErrors(errors, index, key, i18n.t('WrongFieldType'));
          }
          return;
        }

        if (value && !(validFieldsKeys || []).includes(value)) {
          addToErrors(errors, index, key, i18n.t('WrongFieldType'));
        }
      });
    });

    return errors;
  };
};
