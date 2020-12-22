import { Fragment } from 'react'
import Head from '../components/Head'
import { AuctionStats, Footer, Header, PageBox } from '../components/molecules'
import { AuctionItem, NavigationBar } from '../components/organisms'
import { PageTemplate } from '../components/templates'
import { ItemsWrapper } from './_styles'
import { useSocketContext } from '../context'

interface AuctionItem {
	id: number
	name: string
	type: string
	image: string
	bidCost: number
	worth: number
	timeStart: Date
	timeEnd: Date
	bidderId: string
	bidderImage: string
	bidderName: string
	currentPrice: number
}

const Home = () => {
	const { auctions } = useSocketContext()

	return (
		<Fragment>
			<Head title={'Home'} />
			<PageTemplate navigation={<NavigationBar />} footer={<Footer />}>
				<Header image={'/img/header.png'} mobileImage={'/img/header-mobile.png'} />
				<PageBox page={'AUCTIONS'} />
				<AuctionStats
					stats={[
						{ description: '| Just sold for $4.41', value: 'Tempered AK47' },
						{ description: 'Items sold in last 48 hours', value: 12 },
						{ description: 'Total Items Listed', value: 142 },
						{ description: 'Users created in last 48 hours', value: 2 },
						{ description: 'Total Users', value: 3214 },
					]}
				/>
				<ItemsWrapper>
					{auctions.map((auction) => (
						<AuctionItem
							key={auction.id}
							id={auction.id}
							name={auction.name}
							type={auction.type}
							image={auction.image}
							bidCost={auction.bidCost}
							worth={auction.worth}
							timeStart={auction.timeStart}
							timeEnd={auction.timeEnd}
							bidderImage={auction.highestBidder.avatar}
							bidderName={auction.highestBidder.username}
							currentPrice={auction.currentPrice}
						/>
					))}
				</ItemsWrapper>
			</PageTemplate>
		</Fragment>
	)
}

export default Home
