import { observable, action } from 'mobx';
import axios from './axios';

export default class LoadingStore {
    
  @observable loading = 0;

  @action start() {
    this.loading++
    console.log('loading started', this.loading)
  }

  @action completed() {
    this.loading--
    console.log('loading completed', this.loading)
  }
}