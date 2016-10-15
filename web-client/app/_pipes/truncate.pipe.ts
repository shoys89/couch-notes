import {Pipe} from '@angular/core'

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, boundle: number, signal:string) : string {
    let limit = typeof(boundle) != 'undefined' ? boundle : 10;
    let trail = typeof(signal) != 'undefined' ? signal : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}