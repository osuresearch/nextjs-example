import Head from 'next/head'
import useSWR from 'swr'
import { Box, Group, Heading, Stack, Text } from '@osuresearch/ui'
import { OhioStateAppShell } from '@/components/OhioStateAppShell'
import links from '../../nav';

export default function Docs() {
  return (
    <OhioStateAppShell links={links}>
      <Head>
        <title>Documentation - Demo App</title>
      </Head>

      <Stack>
        <Heading level={1}>Heading 1</Heading>
        <Text as="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ligula risus, consequat eget fringilla vel, rutrum nec mauris. Curabitur malesuada diam a justo blandit, non suscipit erat pretium. Aliquam vitae massa condimentum, fermentum ipsum ac, elementum ipsum. Suspendisse at orci blandit, imperdiet nunc ac, semper turpis. Praesent non nibh diam. Phasellus elit magna, semper vel massa nec, aliquet aliquet ex. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed pharetra ultricies ligula, a aliquam est efficitur et. Aliquam bibendum sapien eu nisl viverra pretium. Vestibulum a suscipit diam.
        </Text>

        <Heading level={2}>Heading 2</Heading>
        <Text as="p">
          Integer ut massa sed nibh vestibulum ornare. Phasellus dictum ligula vitae quam laoreet, at porta mauris rutrum. Sed semper metus ac ornare consectetur. Nunc vitae porta diam. In dui lacus, pulvinar nec blandit a, cursus ac erat. Nunc vitae arcu ligula. Aliquam nec ultrices dui. Fusce lacus dolor, finibus ultricies risus lacinia, placerat tempus dui. Nunc elementum ante sem, eu pharetra lacus ultrices id. Phasellus finibus libero sit amet ligula consequat, sit amet laoreet nunc maximus. Nullam odio orci, eleifend ac cursus quis, scelerisque in nunc.
        </Text>

        <Text as="p">
          Donec augue nulla, tincidunt sit amet ante porta, semper tempor mi. Curabitur nibh ante, bibendum eget neque eu, congue auctor velit. Quisque diam justo, elementum vitae magna id, molestie imperdiet eros. Ut rutrum turpis libero, at porta ex ultricies vitae. Vivamus aliquam magna at mauris tempor iaculis. Ut a nulla finibus, sodales leo eget, finibus leo. Nunc laoreet pretium lectus, nec maximus metus. Sed facilisis est sit amet eros pretium iaculis. Vestibulum nec gravida lorem. Sed ornare, ante sit amet dapibus auctor, quam velit tempus lacus, sed fringilla erat lorem eu nisi. Suspendisse potenti. Suspendisse consequat neque id est varius venenatis. Phasellus porttitor consequat ipsum, in mattis ante tristique id. Nulla quis ante eu sapien feugiat aliquam sed pulvinar erat. Morbi facilisis dapibus erat sit amet facilisis. Etiam congue hendrerit risus, vitae finibus orci consequat at.
        </Text>
        <Text as="p">
          Nunc posuere faucibus vehicula. Curabitur consectetur nec metus id molestie. Ut consectetur ipsum vel mattis vestibulum. Nullam dignissim justo ut tortor dictum tristique. Nunc iaculis, enim vel tincidunt tempor, lorem turpis tincidunt risus, eget euismod nulla ligula eget massa. In ac metus sollicitudin mi tincidunt bibendum. Donec cursus porta purus, nec euismod nisl malesuada et. Fusce fringilla ultrices congue. Duis eget cursus massa. Vestibulum vitae pretium sapien. Praesent in tortor sit amet dui pellentesque rutrum a in felis. Aenean a neque vulputate, placerat nunc vel, mollis dolor. Donec ullamcorper risus a eros vulputate dignissim a nec est. Cras porta porttitor tempor. Aliquam nec ornare ipsum, id porttitor erat.
        </Text>
        <Text as="p">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus et lobortis massa, sit amet finibus urna. Donec lacus mi, vestibulum eget placerat vel, pretium in orci. Donec sed neque sit amet nisi faucibus placerat. Aenean urna velit, commodo quis accumsan id, condimentum vulputate erat. Pellentesque lacinia sed nisi vitae maximus. Nulla arcu ex, tincidunt nec mi a, tincidunt sagittis est. Nam tempor lorem nunc, nec tincidunt diam iaculis sed.
        </Text>
      </Stack>
    </OhioStateAppShell>
  )
}