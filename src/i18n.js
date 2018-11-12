import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

let resources = {
  en: {
    common: {
      "title": "BMS",
      "start": "This page is in English.",
      'yes': 'Yes',
      'no': 'No',
      'np': 'No information',
      'username': 'Username',
      'creator': 'Created by',
      'creation_date': 'Creation date',
      'delete': 'delete',
      'sure': 'Are you sure?'
    },
    header: {
      'explore': 'Explore',
      'borehole': 'Borehole editor',
      'check': 'Pending',
      'validation': 'Publish',
      'settings': 'Settings',
      'language': 'Language',
      'view_preferences': 'View',
      'user_preferences': 'User preferences',
      'hide_map': 'Hide map'
    },
    home: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter',
      'back_to_list': 'back to list'
    },
    editor: {
      'title': 'Project',
      'title2': 'Boreholes',
      'search': 'Search project',
      'project_name': 'Project name',
      'create_new': 'Create new project',
      'create': 'Create'
    },
    borehole_form: {
      'completness': 'Completness',
      'meta_location': 'Location',
      'meta_borehole': 'Borehole',
      'form_admin': 'Admin',
      'meta_stratigraphy': 'Stratigraphy',
      'loading_fetch': 'Loading an existing borehole..',
      'creation_fetch': 'Preparing a new borehole..',
      'duplicate': 'Duplicated value: assign a new value.',
      'date_format': 'dd.mm.yyyy',
      'original_name': 'Original name',
      'public_name': 'Public name',
      'kind': 'Drilling type',
      'project_name': 'Project name',
      'restriction': 'Restriction',
      'restriction_until': 'Restriction date',
      'coordinates': 'Coordinates',
      'location_x': 'Coordinate East',
      'location_y': 'Coordinate North',
      'srs': 'SRS',
      'qt_location': 'CQ Coordinates',
      'elevation_z': 'Elevation (masl)',
      'hrs': 'HRS',
      'qt_elevation': 'CQ Elevation Z',
      'country': 'Country',
      'canton': 'Canton',
      'city': 'City',
      'address': 'Address',
      'landuse': 'Land use',
      'method': 'Drilling method',
      'drilling_date': 'Drill end date',
      'cuttings': 'Cuttings',
      'purpose': 'Purpose',
      'drill_diameter': 'Drill diameter (m)',
      'status': 'Status of borehole',
      'bore_inc': 'Inclination (°)',
      'bore_inc_dir': 'Inclination direction (°)',
      'qt_bore_inc_dir': 'QC Inclin. / Direction',
      'length': 'Depth (MD) (m)',
      'qt_length': 'QC depth',
      'top_bedrock': 'Top bedrock',
      'qt_top_bedrock': 'QC top bedrock',
      'groundwater': 'Groundwater',
      'yes': 'Yes',
      'no': 'No',
      'lit_pet_top_bedrock': 'Lit/Pet Top bedrock',
      'lit_str_top_bedrock': 'Litstrati top bedrock',
      'chro_str_top_bedrock': 'Chronostrati top bedrock',
      'processing_status': 'Processing status',
      'national_relevance': 'Nationale relevance',
      'attributes_to_edit': 'Attributes to edit',
      'mistakes': 'Mistakes',
      'remarks': 'Remarks'
    },
    layer_form: {
      'loading_fetch': 'Loading an existing layer..',
      'creation_fetch': 'Preparing a new layer..',
      'depth': 'Depth',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Layer description',
      'geology': 'Geology description',
      'last': 'End of borehole',
      'qt_description': 'QC description',
      'lithology': 'Lithology / Petrology',
      'lithostratigraphy': 'Litho-stratigraphy',
      'chronostratigraphy': 'Chrono-stratigraphie',
      'tectonic_unit': 'Tectonic Unit',
      'symbol': 'Symbol',
      'color': 'Color',
      'plasticity': 'Plasticity',
      'humidity': 'Humidity',
      'consistance': 'Consistance',
      'alteration': 'Alteration',
      'compactness': 'Compactness',
      'jointing': 'Jointing',
      'soil_state': 'Soil state',
      'organic_component': 'Organic components',
      'striae': 'Striae',
      'grain_size_1': 'Grain size 1',
      'grain_size_2': 'Grain size 2',
      'grain_shape': 'Grain shape',
      'grain_granularity': 'Grain angularity',
      'cohesion': 'Cohesion',
      'further_properties': 'Further properties',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS original',
      'uscs_determination': 'USCS determination',
      'unconrocks': 'Classe de sol (KT GE)',
      'debris': 'Debris',
      'lit_pet_deb': 'Litho/Petro debris',
      'lithok': 'Lithok',
      'kirost': 'Kirost',
      'notes': 'Notes',
    },
    search: {
      'reset': 'reset',
      'identifier': 'Identifier',
      'last_update': 'Last update',
      'creation': 'Creation date',
      'completness': 'Filter by completness',
      'all': 'All',
      'complete': 'Completed',
      'incomplete': 'Incompleted',
      'empty': 'Empty'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter'
    }
  },
  de: {
    common: {
      "title": "BMS",
      'yes': 'Ja',
      'no': 'Nein',
      'np': 'Keine Angabe',
      'username': 'Username',
      'creator': 'Created by',
      'creation_date': 'Creation date',
      'delete': 'delete',
      'sure': 'Are you sure?'
    }
  },
  it: {
    common: {
      "title": "BMS",
      "start": "Questa pagina è in Italiano",
      'yes': 'Sì',
      'no': 'No',
      'np': 'Nessuna informazione',
      'username': 'Nome utente',
      'creator': 'Creato da',
      'creation_date': 'Data di creazione',
      'delete': 'Elimina',
      'sure': 'Sei sicuro?'
    },
    header: {
      'explore': 'Esplora',
      'borehole': 'Editor sondaggi',
      'check': 'Pendenze',
      'validation': 'Pubblicazione',
      'settings': 'Impostazioni',
      'language': 'Lingua',
      'view_preferences': 'Visualizzazione',
      'user_preferences': 'Preferenze utente',
      'hide_map': 'Nascondi la mappa'
    },
    home: {
      'legend': 'Legenda mappa',
      'attribute_filter': 'Filtri',
      'spatial_filter': 'Filtri spaziali',
      'back_to_list': 'Torna alla lista'
    },
    editor: {
      'title': 'Progetti',
      'title2': 'Sondaggi',
      'project_name': 'Nome progetto',
      'search': 'Ricerca progetto',
      'create_new': 'Crea nuovo',
      'create': 'Crea'
    },
    borehole_form: {
      'completness': 'Completezza',
      'meta_location': 'Posizione',
      'meta_borehole': 'Sondaggio',
      'form_admin': 'Amministrativo',
      'meta_stratigraphy': 'Startigrafia',
      'loading_fetch': 'Caricamento di un sondaggio esistente..',
      'creation_fetch': 'Preparazione di un nuovo sondaggio..',
      'duplicate': 'Valore duplicato: assegnare un altro valore.',
      'date_format': 'gg.mm.aaaa',
      'original_name': 'Nome originario',
      'public_name': 'Nome pubblico',
      'kind': 'Tipologia di perforazione',
      'project_name': 'Nome progetto',
      'restriction': 'Restrizione',
      'restriction_until': 'Data restrizione',
      'coordinates': 'Coordinate',
      'location_x': 'Coordinata Est',
      'location_y': 'Coordinata Nord',
      'srs': 'SRS',
      'qt_location': 'Qualità coordinate',
      'elevation_z': 'Altitudine (msl)',
      'hrs': 'HRS',
      'qt_elevation': 'Qualità elevazione',
      'country': 'Paese',
      'canton': 'Cantone',
      'city': 'Città',
      'address': 'Indirizzo',
      'landuse': 'Uso del suolo',
      'method': 'Tipologia di perforazione',
      'drilling_date': 'Data fine perforazione',
      'cuttings': 'Taglio',
      'purpose': 'Scopo',
      'drill_diameter': 'diametro perforazione (m)',
      'status': 'Stato del sondaggio',
      'bore_inc': 'Inclinazione (°)',
      'bore_inc_dir': 'Direzione inclinazione (°)',
      'qt_bore_inc_dir': 'Qualità Inclin. / Direz.',
      'length': 'Profondità (MD) (m)',
      'qt_length': 'Qualità profondità',
      'top_bedrock': 'Top bedrock',
      'qt_top_bedrock': 'QC top bedrock',
      'groundwater': 'Groundwater',
      'yes': 'Sì',
      'no': 'No',
      'lit_pet_top_bedrock': 'Lit/Pet Top bedrock',
      'lit_str_top_bedrock': 'Litstrati top bedrock',
      'chro_str_top_bedrock': 'Chronostrati top bedrock',
      'processing_status': 'Stato del processamento',
      'national_relevance': 'Rilevanza nazionale',
      'attributes_to_edit': 'Attributi da modificare',
      'mistakes': 'Mistakes',
      'remarks': 'Remarks'
    },
    layer_form: {
      'loading_fetch': 'Loading an existing layer..',
      'creation_fetch': 'Preparing a new layer..',
      'depth': 'Profondità',
      'depth_from': 'Top MD (m)',
      'depth_to': 'Base MD (m)',
      'description': 'Descrizione livello',
      'geology': 'Descrizione geologia',
      'last': 'Fine del sondaggio',
      'qt_description': 'Qualità descrizione',
      'lithology': 'Litologia / Petrologia',
      'lithostratigraphy': 'Litho-stratigrafia',
      'chronostratigraphy': 'Chrono-stratigrafia',
      'tectonic_unit': 'Tectonic Unit',
      'symbol': 'Symbol',
      'color': 'Colore',
      'plasticity': 'Plasticity',
      'humidity': 'Humidity',
      'consistance': 'Consistenza',
      'alteration': 'Alterazione',
      'compactness': 'Compattezza',
      'jointing': 'jointing',
      'soil_state': 'Soil state',
      'organic_component': 'Organic components',
      'striae': 'Striae',
      'grain_size_1': 'Grain size 1',
      'grain_size_2': 'Grain size 2',
      'grain_shape': 'Grain shape',
      'grain_granularity': 'Grain angularity',
      'cohesion': 'Cohesion',
      'further_properties': 'Further properties',
      'uscs_1': 'USCS 1',
      'uscs_2': 'USCS 2',
      'uscs_3': 'USCS 3',
      'uscs_original': 'USCS original',
      'uscs_determination': 'USCS determination',
      'unconrocks': 'Classe de sol (KT GE)',
      'debris': 'Debris',
      'lit_pet_deb': 'Litho/Petro debris',
      'lithok': 'Lithok',
      'kirost': 'Kirost',
      'notes': 'Note',
    },
    search: {
      'reset': 'azzera',
      'identifier': 'Codice di identificazione',
      'last_update': 'Ultima modifica',
      'creation': 'Data di creazione',
      'completness': 'Filtra per complettezza',
      'all': 'Tutti',
      'complete': 'Completati',
      'incomplete': 'Incompleti',
      'empty': 'Vuoti'
    },
    grid: {
      'legend': 'Map legend',
      'attribute_filter': 'Filter',
      'spatial_filter': 'Spatial filter'
    }
  }
}

i18n
.use(LanguageDetector)
.init({
  // we init with resources
  resources: resources,
  // lng: 'en',
  // fallbackLng: 'en',
  fallbackLng: { 
    'en': ['en-US'], 
    'default': ['en']
  },
  whitelist: ['en', 'it', 'de', 'fr'],

  // have a common namespace used around the full app
  // ns: ['common', 'header', 'menu'],
  defaultNS: 'common',

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ','
  },

  react: {
    wait: true
  }
})

export default i18n
