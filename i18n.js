import i18n from 'i18next';

i18n.init({
  fallbackLng: 'en',
  supportedLngs: ['en', 'pl'],
  resources: {
    en: {
      translation: {
        Source: 'Source field name',
        SourceHelpText:
          'Select the field from which the content will be given for analysis, as the main content',
        Title: 'Title field name',
        TitleHelpText:
          'Select the field whose content will be provided for analysis as an h1 tag',
        Lead: 'Lead field name',
        LeadHelpText:
          'Select the field whose contents will be given to the analysis as p tag',
        Faq: 'FAQ',
        FaqHelpText: 'Select the field from FAQ will be embeded to analysis',
        ContentType: 'Content Type',
        ContentTypeHelpText: '',
        FieldRequired: 'Field is required',
        WrongFieldType: 'This field type is not supported',
        NonRequiredFieldsInCTD:
          'Make sure the selected content type contains fields that can be used in the plugin. ' +
          'Allowed types: {{types}}',
        ThirdPartyCookies:
          'You might need to enable third-party cookies in your browser for this integration to function properly',
      },
    },
    pl: {
      translation: {
        Source: 'Pole źródła',
        SourceHelpText:
          'Wybierz pole z którego zawartość będzie podana do analizy, jako główny content',
        Title: 'Pole tytułu',
        TitleHelpText:
          'Wybierz pole którego zawartość będzie podana do analizy jako tag h1',
        Lead: 'Pole wprowadzenia',
        LeadHelpText:
          'Wybierz pole którego zawartość będzie podana analizy jako tag p',
        Faq: 'FAQ',
        FaqHelpText:
          'Wybierz pole którego z którego zostaną pobrane FAQ, oraz przekazane do analizy',
        ContentType: 'Typ zawartości',
        ContentTypeHelpText: '',
        FieldRequired: 'Pole jest wymagane',
        WrongFieldType: 'Ten typ pola nie jest wspierany',
        NonRequiredFieldsInCTD:
          'Upewnij się, że wybrany typ definicji zawiera pola, które mogą być wykorzystane we wtyczce. ' +
          'Dozwolone typy: {{types}}',
        ThirdPartyCookies:
          'Aby ta integracja działała poprawnie, konieczne może być włączenie w przeglądarce obsługi ' +
          'plików cookie innych firm',
      },
    },
  },
});

export default i18n;
