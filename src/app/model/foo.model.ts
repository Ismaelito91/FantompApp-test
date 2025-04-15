import Bar from "./bar.model";

interface DefaultFoo {
   id: number;
   name: string;
   attributCamelCase: string;
}

export interface ReducedFoo extends DefaultFoo {
   
}

export default interface Foo extends DefaultFoo {
   bars: Bar[];
}
