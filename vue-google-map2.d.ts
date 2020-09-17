import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const VueGoogleMap2: { install: InstallFunction };
export default VueGoogleMap2;

export const VueGoogleMap2Sample: VueConstructor<Vue>;
