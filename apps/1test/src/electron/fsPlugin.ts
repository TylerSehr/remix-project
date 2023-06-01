import { PluginClient } from "@remixproject/plugin";
import { createClient } from "./lib/electronPluginClient"
import { Plugin } from '@remixproject/engine';
import fs from 'fs/promises'
import { Stats } from "fs";
import { Profile } from "@remixproject/plugin-utils";

const profile: Profile = {
  displayName: 'fs',
  name: 'fs',
  description: 'fs',
}

export class FSPlugin extends Plugin {
  client: PluginClient
  constructor(){
    super(profile)
  }

  onActivation(): void {
    this.client = new FSPluginClient()
  }

}

class FSPluginClient extends PluginClient {
  constructor(){
    super()
    this.methods = ['readdir', 'readFile', 'writeFile', 'mkdir', 'rmdir', 'unlink', 'rename', 'stat', 'exists']
    createClient(this, profile)
    this.onload(() => {
      console.log('fsPluginClient onload')
    })
  }

  async readdir(path: string): Promise<string[]> {
    // call node fs.readdir
    return fs.readdir(path)
  }

  async readFile(path: string): Promise<string> {
    return fs.readFile(path, 'utf8')
  }

  async writeFile(path: string, content: string): Promise<void> {
    return fs.writeFile(path, content, 'utf8')
  }

  async mkdir(path: string): Promise<void> {
    return fs.mkdir(path)
  }

  async rmdir(path: string): Promise<void> {
    return fs.rmdir(path)
  }

  async unlink(path: string): Promise<void> {
    return fs.unlink(path)
  }

  async rename(oldPath: string, newPath: string): Promise<void> {
    return fs.rename(oldPath, newPath)
  }

  async stat(path: string): Promise<Stats> {
    return fs.stat(path)
  }

  async exists(path: string): Promise<boolean> {
    return fs.access(path).then(() => true).catch(() => false)
  }



}