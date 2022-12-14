import {Button, Card, Checkbox, Divider, Grid, Input, Slider, Space, Notification} from '@arco-design/web-react';
import {IconCopy, IconGithub, IconLoop} from '@arco-design/web-react/icon';

import {generate} from 'generate-password';
import {useRef, useState} from 'react';

const Index = () =>
{
    const [passwordLength, setPasswordLength] = useState(16);
    const [checkNumbers, setCheckNumbers] = useState(true);
    const [checkSymbols, setCheckSymbols] = useState(false);

    const [password, setPassword] = useState(null);

    const refPassword = useRef();

    const onGenerate = () =>
    {
        setPassword(generate({
            length: passwordLength,
            numbers: checkNumbers,
            symbols: checkSymbols
        }));
    };

    const copyToClipboard = () =>
    {
        const {value} = refPassword.current.dom;

        if (value)
        {
            navigator.permissions.query({name: 'clipboard-write'}).then(result =>
            {
                if (result.state === 'granted' || result.state === 'prompt')
                {
                    navigator.clipboard.writeText(value).then(() =>
                    {
                        Notification.info({
                            title: 'Generator',
                            content: 'Copied to clipboard'
                        });
                    });
                }
            });
        }
    };

    return <>
        <Card title={'Password Generator'}
              className={'app'}>
            <Grid.Row>
                <Grid.Col span={6}>Length ({passwordLength}):</Grid.Col>
                <Grid.Col span={18}
                          style={{
                              paddingLeft: '12px'
                          }}>
                    <Slider defaultValue={passwordLength}
                            onChange={setPasswordLength}
                            max={32}
                            min={8}
                            showTicks={true}
                            step={2}/>
                </Grid.Col>
            </Grid.Row>

            <Grid.Row>
                <Grid.Col span={6}>Numbers:</Grid.Col>
                <Grid.Col span={18}>
                    <Checkbox checked={checkNumbers}
                              onChange={() => setCheckNumbers(!checkNumbers)}/>
                </Grid.Col>
            </Grid.Row>

            <Grid.Row>
                <Grid.Col span={6}>Symbols:</Grid.Col>
                <Grid.Col span={18}>
                    <Checkbox checked={checkSymbols}
                              onChange={() => setCheckSymbols(!checkSymbols)}/>
                </Grid.Col>
            </Grid.Row>

            <Divider/>

            <div className={'h-box'}>
                <Input placeholder={'Click Generate'}
                       ref={refPassword}
                       size={'large'}
                       readOnly={true}
                       value={password}/>
                <Space>
                    <Button type={'primary'}
                            size={'large'}
                            icon={<IconLoop/>}
                            onClick={onGenerate}>Generate</Button>

                    <Button icon={<IconCopy/>}
                            size={'large'}
                            onClick={copyToClipboard}>Copy</Button>
                </Space>
            </div>

            <Divider/>

            <div className={'h-box'}
                 style={{
                     justifyContent: 'space-between'
                 }}>
                Designed by Skitsanos. <Button type={'text'}
                                               icon={<IconGithub/>}
                                               href={'https://github.com/skitsanos/password-generator'}>Sources</Button>
            </div>
        </Card>
    </>;
};

export default Index;