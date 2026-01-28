import {Button, Card, Checkbox, Divider, Grid, Input, Slider, Space, Notification} from '@arco-design/web-react';
import {IconCopy, IconGithub, IconLoop} from '@arco-design/web-react/icon';

import {useState} from 'react';

export default function Index()
{
    const [passwordLength, setPasswordLength] = useState(16);
    const [checkNumbers, setCheckNumbers] = useState(true);
    const [checkSymbols, setCheckSymbols] = useState(false);

    const [password, setPassword] = useState('');

    const onGenerate = () =>
    {
        const baseChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numberChars = '0123456789';
        const symbolChars = '!@#$%^&*()-_=+[]{};:,.<>?';
        const pool = `${baseChars}${checkNumbers ? numberChars : ''}${checkSymbols ? symbolChars : ''}`;

        if (!pool)
        {
            Notification.warning({
                title: 'Generator',
                content: 'Enable numbers or symbols to generate a password'
            });
            return;
        }

        const randomValues = new Uint32Array(passwordLength);
        window.crypto.getRandomValues(randomValues);

        let result = '';
        for (let i = 0; i < passwordLength; i += 1)
        {
            result += pool[randomValues[i] % pool.length];
        }

        setPassword(result);
    };

    const copyToClipboard = async () =>
    {
        if (!password)
        {
            Notification.warning({
                title: 'Generator',
                content: 'Generate a password first'
            });
            return;
        }

        try
        {
            if (navigator.clipboard?.writeText)
            {
                await navigator.clipboard.writeText(password);
            }
            else
            {
                const textarea = document.createElement('textarea');
                textarea.value = password;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.top = '-9999px';
                textarea.style.left = '-9999px';
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            Notification.info({
                title: 'Generator',
                content: 'Copied to clipboard'
            });
        }
        catch (error)
        {
            Notification.error({
                title: 'Generator',
                content: 'Failed to copy to clipboard'
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
                    <Slider value={passwordLength}
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
                              onChange={setCheckNumbers}/>
                </Grid.Col>
            </Grid.Row>

            <Grid.Row>
                <Grid.Col span={6}>Symbols:</Grid.Col>
                <Grid.Col span={18}>
                    <Checkbox checked={checkSymbols}
                              onChange={setCheckSymbols}/>
                </Grid.Col>
            </Grid.Row>

            <Divider/>

            <div className={'h-box'}>
                <Input placeholder={'Click Generate'}
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
                            disabled={!password}
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
}
