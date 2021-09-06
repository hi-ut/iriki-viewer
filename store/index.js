export const state = () => ({
  data: {},
  panes: {},
  panes2: {},
  p00: '',
  contents: {},
  anchorId: '',
  punc: 'no',
  target: '',
  targetFrom: '',
  hoverTarget: '',
  manifest: '',
  canvas: '',
  zone: '',
  zones: {},
  anchor: true,
  options: {},
  ner: false,
  name: '',
  xml: null,
  placeId: '',
  listId: '',
  personId: '',
  nameId: '',
})

export const mutations = {
  setData(state, data) {
    state.data = data
  },
  setPanes(state, data) {
    state.panes = data
  },
  setPanes2(state, data) {
    state.panes2 = data
  },
  setP00(state, data) {
    state.p00 = data
  },
  setContents(state, data) {
    state.contents = data
  },
  setAnchorId(state, data) {
    state.anchorId = data
  },
  setPunc(state, data) {
    state.punc = data
  },
  setTarget(state, data) {
    state.target = data
  },
  setTargetFrom(state, data) {
    state.targetFrom = data
  },
  setHoverTarget(state, data) {
    state.hoverTarget = data
  },
  setManifest(state, data) {
    state.manifest = data
  },
  setCanvas(state, data) {
    state.canvas = data
  },
  setZone(state, data) {
    state.zone = data
  },
  setZones(state, data) {
    state.zones = data
  },
  setAnchor(state, data) {
    state.anchor = data
  },
  setOptions(state, data) {
    state.options = data
  },
  setNer(state, data) {
    state.ner = data
  },
  setName(state, data) {
    state.name = data
  },
  setXml(state, data) {
    state.xml = data
  },
  setPlaceId(state, data) {
    state.placeId = data
  },
  setPersonId(state, data) {
    state.personId = data
  },
  setListId(state, data) {
    state.listId = data
  },
  setNameId(state, data) {
    state.nameId = data
  },
}

export const getters = {
  getData(state) {
    return state.data
  },
  getPanes(state) {
    return state.panes
  },
  getPanes2(state) {
    return state.panes2
  },
  getP00(state) {
    return state.p00
  },
  getContents(state) {
    return state.contents
  },
  getAnchorId(state) {
    return state.anchorId
  },
  getPunc(state) {
    return state.punc
  },
  getTarget(state) {
    return state.target
  },
  getTargetFrom(state) {
    return state.targetFrom
  },
  getHoverTarget(state) {
    return state.hoverTarget
  },
  getManifest(state) {
    return state.manifest
  },
  getCanvas(state) {
    return state.canvas
  },
  getZone(state) {
    return state.zone
  },
  getZones(state) {
    return state.zones
  },
  getAnchor(state) {
    return state.anchor
  },
  getOptions(state) {
    return state.options
  },
  getNer(state) {
    return state.ner
  },
  getName(state) {
    return state.name
  },
  getXml(state) {
    return state.xml
  },
  getPlaceId(state) {
    return state.placeId
  },
  getPersonId(state) {
    return state.personId
  },
  getListId(state) {
    return state.listId
  },
  getNameId(state) {
    return state.nameId
  },
}
