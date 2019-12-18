import { Component } from 'vue'
import { IDictionary } from 'common-types'
// import { StoryDecorator } from '@storybook/vue'

interface IRoutes {
  routes: IRoute[]
}

interface IRoute {
  path: string
  component: Component
}

export default function StoryRouter(links?: IDictionary, routerProps?: IRoutes): any
