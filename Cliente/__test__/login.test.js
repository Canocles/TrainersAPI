import React from 'react';
import renderer from 'react-test-renderer'
import Login from '../src/componentes/Login';

describe('Login (snpashot)', () => {
  it('El componente de Login se renderiza correctamente', () => {
    const component = renderer.create(<Login />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
