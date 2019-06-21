import * as regex from 'regex';
export class JSONPathDecoder {
  public static decode(object: any, path: string) {
    const props = path.split(".");
    let runningObject = object;

    try {
      props.forEach(prop => {
        runningObject = JSONPathDecoder.parseProperty(prop, runningObject);
      });
    } catch {
      return undefined;
    }

    return runningObject;
  }

  private static parseProperty(prop: string, object): Array<any> {
      if (prop.startsWith('/') && prop.endsWith('/')) {
        const property = prop.replace('/', '');
        const keys = Object.keys(object);

        keys.forEach(key => {

        });


      } else if (prop.startsWith('/') || prop.endsWith('/')) {
          // Error invalid syntax
      } else {
        return object[prop];
      }
  }
}
