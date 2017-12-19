import React from 'react';
import renderer from 'react-test-renderer'
import Bienvenida from '../src/componentes/Bienvenida';

describe('Welcome (Snapshot)', () => {
  it('Welcome renders hello world', () => {
    const component = renderer.create(<Bienvenida />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
