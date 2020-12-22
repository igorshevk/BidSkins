import { Fragment } from 'react'
import { P } from '../components/atoms'
import Head from '../components/Head'
import { AccordionItem, AuctionStats, Footer, PageBox } from '../components/molecules'
import { NavigationBar } from '../components/organisms'
import { PageTemplate } from '../components/templates'

import { QuestionsWrapper } from './_styles/faq'

const Packages = () => {
	return (
		<Fragment>
			<Head title={'FAQ'} />
			<PageTemplate navigation={<NavigationBar steamId={''} />} footer={<Footer />}>
				<PageBox page={'FAQ'} startText={'Frequently Asked Questions'} importantText={''} endText={''} />
				<AuctionStats
					stats={[
						{ description: '| Just sold for $4.41', value: 'Tempered AK47' },
						{ description: 'Items sold in last 48 hours', value: 12 },
						{ description: 'Total Items Listed', value: 142 },
						{ description: 'Users created in last 48 hours', value: 2 },
						{ description: 'Total Users', value: 3214 },
					]}
				/>
				<QuestionsWrapper>
					<AccordionItem heading={'What is Bidskins?'}>
						<P fontWeight={700} fontSize={14}>
							Congratulations! You are now a member of the Bidskins team, and one of the new faces of
							Bidskins.
						</P>
						<br />
						<P fontWeight={700} fontSize={14}>
							This is great news, although this promotion also comes with a new set of
							responsibilities. In addition to following the rules, you will also have to enforce
							them in a mature and professional manner. If you fail to do so, you will be demoted
							promptly.
						</P>
					</AccordionItem>
				</QuestionsWrapper>
			</PageTemplate>
		</Fragment>
	)
}

export default Packages
