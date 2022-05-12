import { MyModuleModule } from './my-module.module';

describe('MyModuleModule', () => {
  let myModuleModule: MyModuleModule;

  beforeEach(() => {
    myModuleModule = new MyModuleModule();
  });

  it('should create an instance', () => {
    expect(myModuleModule).toBeTruthy();
  });
});
