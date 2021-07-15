declare module "memoryjs" {
  declare interface Process {
    th32ProcessID: number;
    handle: number;
  }

  declare enum Type {
    BYTE = "byte",
    INT = "int",
    INT32 = "int32",
    UINT32 = "uint32",
    INT64 = "int64",
    UINT64 = "uint64",
    DWORD = "dword",
    SHORT = "short",
    LONG = "long",
    FLOAT = "float",
    DOUBLE = "double",
    BOOL = "bool",
    BOOLEAN = "boolean",
    PTR = "ptr",
    POINTER = "pointer",
    STR = "str",
    STRING = "string",
    VEC3 = "vec3",
    VECTOR3 = "vector3",
    VEC4 = "vec4",
    VECTOR4 = "vector4",
  }

  declare function openProcess(name: string): Process;
  declare function getModules(
    processId: number
  ): { szModule: string; modBaseAddr: number }[];
  declare function readMemory(
    handle: number,
    address: number,
    type: Type
  ): number;
  declare function writeMemory(
    handle: number,
    address: number,
    value: any,
    type: Type
  ): void;
}
