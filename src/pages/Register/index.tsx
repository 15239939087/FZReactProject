import React, { useEffect } from 'react';
import { Form, Input, Button, Message } from '@arco-design/web-react';
import Api from './service/index';

const FormItem = Form.Item;

function App() {
  const [form] = Form.useForm();
  useEffect(() => {
    // fetch('http://localhost:3333/article/list', ).then((data) => {
    //   return data.json()
    // }).then((res) => {
    //   console.log(res)
    // })
   
  })
  const fetchRegister = (v: any) => {
    console.log(v);
    const params = {
     ...v
    }
    Api.userRegister(params).then((data) => {
      console.log(data, 999);
    });
    Message.success('success');
  }
  return (
    <Form
      form={form}
      style={{ width: 320 }}
      wrapperCol={{ span: 24 }}
      autoComplete='off'
      onValuesChange={(v, vs) => {
        console.log(v, vs);
      }}
      onSubmit={fetchRegister}
    >
      <FormItem field='nickname' rules={[{ required: true, message: 'username is required' }]}>
        <Input placeholder='please enter your username' />
      </FormItem>
      <FormItem field='mobile' rules={[{ required: true, message: 'password is required' }]}>
        <Input placeholder='please enter your mobile' />
      </FormItem>
      <FormItem field='password' rules={[{ required: true, message: 'password is required' }]}>
        <Input placeholder='please enter your password' />
      </FormItem>
      <FormItem
        field='passwordRepeat'
        rules={[{
          validator: (v, cb) => {
            if (!v) {
              return cb('passwordRepeat is required')
            } else if (form.getFieldValue('password') !== v) {
              return cb('passwordRepeat must be equal with password')
            }
            cb(null)
          }
        }]}
      >
        <Input placeholder='please confirm your password' />
      </FormItem>
      <FormItem>
        <Button type='primary' htmlType='submit' long>
          Register
        </Button>
      </FormItem>
    </Form>
  );
}

export default App;
