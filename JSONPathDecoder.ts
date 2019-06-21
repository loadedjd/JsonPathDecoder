import { Regex } from 'regex';
import { Tokenizer } from './Tokenizer';
import { TokenType } from './types/TokenType.enum';
import * as regex from 'regex';

export class JSONPathDecoder {
  public static decode(object: any, path: string): any {
    let tokenizer = new Tokenizer(path);
    let runningObject = object;

    tokenizer.tokens.reverse().forEach(token => {
      let tokenPath = token.value;
      let tokenType = token.type;
      try {
        if (tokenType == TokenType.String) { // Normal
          runningObject = JSONPathDecoder.solveString(tokenPath, runningObject);
        } else if (tokenType == TokenType.Number) { // Array
            runningObject = JSONPathDecoder.solveNumber(tokenPath, runningObject);
        } else {
            runningObject = JSONPathDecoder.solveRegex(tokenPath, runningObject);
        }
      } catch (e){
        console.log(e);
        return undefined;
      }
    });

    return runningObject;
  }

  private static solveRegex(reg: string, runningObject: object): any[] {
    var rege = new RegExp(`${reg}`);
    var returnArray = [];
    
    (runningObject as Array<any>).forEach(item => {
      Object.keys(item).forEach(key => {
        if (rege.test(key)) {
          returnArray.push(item[key]);
        }
      });
    });

    return returnArray;
  }

  private static solveString(path: string, runningObject: object): any[] {
    var returnOject = [];
    if (Array.isArray(runningObject)) {
      (runningObject as Array<any>).forEach(item => {
        returnOject.push(item[path]);
      });
    } else {
      returnOject.push(runningObject[path]);
    }

    return returnOject;
  }

  private static solveNumber(path: string, runningObject: object): any[] {
    var returnOject = [];
    if (Array.isArray(runningObject)) {
      (runningObject as Array<any>).forEach(item => {
        returnOject.push(runningObject[path]);
      });
    } else {
      returnOject.push(runningObject[path]);
    }

    return returnOject;
  }
}
