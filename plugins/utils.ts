// /plugins/logger.ts
export class Utils {
  getId(id: any): string {
    return id.split('/data/')[1]
  }

  getIcon(text: string): string {
    const map: any = {
      村:
        'https://cdn.mapmarker.io/api/v1/pin?size=25&background=%230062B1&color=%23FFFFFF&voffset=0&hoffset=1&icon=fa-circle',
      崎:
        'https://cdn.mapmarker.io/api/v1/pin?size=25&background=%23999999&color=%23FFFFFF&voffset=0&hoffset=1&icon=fa-circle',
      山:
        'https://cdn.mapmarker.io/api/v1/pin?size=25&background=%234D4D4D&color=%23FFFFFF&voffset=0&hoffset=1&icon=fa-circle',
    }

    return (
      map[text] || '' // 'https://cdn.mapmarker.io/api/v1/pin?size=25&background=%23D33115&color=%23FFFFFF&voffset=0&hoffset=1&icon=fa-circle'
    )
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
