import { Regex } from "regex";
import { Tokenizer } from "./Tokenizer";
import { TokenType } from "./types/TokenType.enum";
import { Token } from "./types/Token.type";

export class JSONPathDecoder {
  public static decode(object: any, path: string): any {
    let tokenizer = new Tokenizer(path);
    return JSONPathDecoder.parse(tokenizer.tokens, object);
  }

  private static parse(tokens: Token[], object: object): any {
    const token = tokens.pop();
    let runningObject = object;

    if (token && token.type === TokenType.String) {
      if (Array.isArray(object)) {
        
        var tempArray = new Array<any>();
        (object as Array<any>).forEach(item => {
          const tokensCopy = [...tokens];
          tokensCopy.push(token);
          tempArray.push(this.parse(tokensCopy, item));
        });

        runningObject = tempArray;
      } else {
        if (tokens.length > 0) {
          runningObject = JSONPathDecoder.parse(tokens, object[token.value]);
        } else {
          runningObject = object[token.value];
        }
      }
    } else if (token && token.type === TokenType.Number) {
      if (Array.isArray(object)) {
        runningObject = this.parse(tokens, object[+token.value]);
      } else return undefined;
    } else if (token && token.type === TokenType.Regex) {
      let tempArray = new Array<any>();
      let keys = Object.keys(object);
      let regex = new RegExp(token.value);

      keys.forEach(key => {
        if (regex.test(key)) {
          tempArray.push(object[key]);
        }
      });

      runningObject = tempArray;
      JSONPathDecoder.parse(tokens, runningObject);
    }

    return runningObject;
  }
}
