import memoryjs, { Type } from "memoryjs";

interface ModuleBaseAddressObject {
  [key: string]: number;
}

export default class ProcessHandler {
  process;
  allModulesBaseAddresses: ModuleBaseAddressObject;
  modulesBaseAddressesWithAppliedOffset: ModuleBaseAddressObject;

  constructor(processName: string) {
    this.process = memoryjs.openProcess(processName);
    this.allModulesBaseAddresses = memoryjs
      .getModules(this.process.th32ProcessID)
      .reduce<{ [key: string]: number }>(
        (acc, item) => ({ ...acc, [item.szModule]: item.modBaseAddr }),
        {}
      );
    this.modulesBaseAddressesWithAppliedOffset = {};
  }

  applyOffsetToModuleBaseAddress(moduleName: string, offset: number) {
    const addressWithOffset = memoryjs.readMemory(
      this.process.handle,
      this.allModulesBaseAddresses[moduleName] + offset,
      Type.DWORD
    );

    this.modulesBaseAddressesWithAppliedOffset[moduleName] = addressWithOffset;
  }

  applyPointersToModuleAddress(moduleName: string, pointers: number[] = []) {
    let address = this.modulesBaseAddressesWithAppliedOffset[moduleName];

    if (!address) throw new Error("Address doesn't exist");

    pointers.forEach((pointer) => {
      address += pointer;
    });

    return address;
  }

  readAddress(address: number, valueType: Type) {
    return memoryjs.readMemory(this.process.handle, address, valueType);
  }

  writeToAddress(address: number, value: any, valueType: Type) {
    memoryjs.writeMemory(this.process.handle, address, value, valueType);
  }
}
