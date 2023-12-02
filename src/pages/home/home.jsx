import {useEffect} from "react";
import electronics from "../../assets/home/cards/electronics.jpg";
import healthCare from "../../assets/home/cards/health care.jpg";
import home from "../../assets/home/cards/home.jpg";
import toys from "../../assets/home/cards/toys.jpg";
import shopSchool from "../../assets/home/cards/shop school.jpg";
import tv from "../../assets/home/cards/tv.jpg";
import beauty from "../../assets/home/cards/beauty.jpg";
import stripeLight from "../../assets/home/cards/stripe light.jpg";
import homeRefresh from "../../assets/home/cards/home refresh.jpg";
import office from "../../assets/home/cards/office.jpg";
import laptop from "../../assets/home/cards/shop laptopjpg.jpg";
import fitness from "../../assets/home/cards/fitness.jpg";
import pets from "../../assets/home/cards/pets.jpg";
import deals from "../../assets/home/cards/deals.jpg";
import cuttle from "../../assets/home/cards/cuttle.jpg"
import kindle from '../../assets/home/cards/kindle.jpg'
import smartwatches from '../../assets/home/cards/smartwatches.jpg'
import clothes from '../../assets/home/cards/clothes2.jpg'
import MainSlider from "./mainSlider";
import MonoCard from "./mono-card";
import QuartitCard from "./quartit-card";
import SecondSlider from "./second-slider";
import {Header} from "../../components/layout/Navbar/navbar";
import Footer from "../../components/layout/AmazonFooter/Footer";
import SliderWithRating from "./sliderWithRating"
import { useTranslation } from "react-i18next";

export const Home = () => {
	useEffect(() => {
		document.title = "Amazon";
	}, []);
	const { t } = useTranslation();

	return (
		<>
			<div>
				<Header />

				<div className='container-fluid p-0 position-relative '>
					{/* main slider */}
					<MainSlider />
					<div className='container-fluid p-0 position-absolute top-50 start-0 '>
						{/* //////////////// cards //////////////*/}
						<div className='row gy-3 m-0 p-4 '>
							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part1")}
								navigation='products/category/65527a31376a52ea210d9703'
								image={electronics}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part2")}
								navigation='products/category/65657705e686c668a4d1891c'
								image={healthCare}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part3")}
								navigation='products/category/656303b31cf9fca552f8cf4b'
								image={home}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part4")}
								navigation='products/category/65657a1ae686c668a4d18968'
								image={toys}
								body={t("home.part24")}
							/>

							<QuartitCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part5")}
								navigation="65527ac3376a52ea210d9706"
								url='/products/categoryPrd/65527ac3376a52ea210d9706'
								limit='4'
								skip='22'
								body={t("home.part24")}
							/>

							<QuartitCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part17")}
								navigation="65527ac3376a52ea210d9706"
								url='/products/categoryPrd/65527ac3376a52ea210d9706'
								limit='4'
								skip='16'
								body={t("home.part23")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part6")}
								navigation="products/SubCategory/6562f4ad1cf9fca552f8c5b0"
								image={shopSchool}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part7")}
								navigation="products/SubCategory/65528009a8299445e5fe5e89"
								image={tv}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='d-lg-none col-sm-4 p-0'
								title={t("home.part28")}
								navigation="products/category/65527c8c376a52ea210d970a"
								image={beauty}
								body={t("home.part24")}
							/>
						</div>
						{/* ///////////cards///////////////////// */}

						{/* ////////////second slider//////////// */}

						<SecondSlider
							id='ss1'
							title1={t("home.part9")}
							title2={t("home.part23")}
							url='/products/categoryPrd/65527ac3376a52ea210d9706'
							skip1='13'
							limit1='6'
							skip2='19'
							limit2='6'
							skip3='25'
							limit3='6'
						/>
						{/* ////////////second slider//////////// */}

						{/* ////////cards//////// */}
						<div className='row gy-2 m-0 p-4'>
							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part10")}
								navigation="products/SubCategory/6568c5bc8535d7773e730a9d"
								image={stripeLight}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part11")}
								navigation="products/SubCategory/6568c70d8535d7773e730b37"
								image={homeRefresh}
								body={t("home.part23")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part12")}
								navigation="products/SubCategory/6562f7981cf9fca552f8c5b4?rating=4"
								image={office}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part13")}
								navigation="products/SubSubCategory/6568a0fa80c1e36f06eba931"
								image={laptop}
								body={t("home.part22")}
							/>
						</div>
						{/* ////////cards//////// */}

						{/* ////////cards////////// */}

						<div className='row gy-2 m-0 p-4'>
							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part14")}
								navigation='products/category/65694948244db28213810b59'
								image={fitness}
								body={t("home.part24")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part15")}
								navigation='products/category/656949da244db28213810bc6'
								image={pets}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part12")}
								navigation='products/SubSubCategory/65694842244db28213810a44?rating=4'
								image={deals}
								body={t("home.part24")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part16")}
								navigation='laptops'
								image={cuttle}
								body={t("home.part22")}
							/>
						</div>
						{/* ////////cards////////// */}

						{/* slider */}

						<SecondSlider
							id='ss2'
							title1="Related to items you've viewed"
							title2='Shop now'
							url='/products/categoryPrd/65527c8c376a52ea210d970a'
							skip1='0'
							limit1='6'
							skip2='6'
							limit2='6'
							skip3='12'
							limit3='6'
						/>


<div className='row gy-2 m-0 p-4'>
							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part9")}
								navigation="products/SubCategory/65694e7b244db28213810d49"
								image={kindle}
								body={t("home.part22")}
							/>

<QuartitCard
								breackPoint='col-lg-3 col-sm-4 p-0'
								title={t("home.part18")}
								navigation="6568c5908535d7773e730a9b?brand=decoration"
								url='/products/subCategoryPrd/65694f7a244db28213810d99'
								limit='4'
								skip='16'
								body={t("home.part23")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part19")}
								navigation='products/SubCategory/656946418535d7773e731deb'
								image={smartwatches}
								body={t("home.part22")}
							/>

							<MonoCard
								breackPoint='col-lg-3 col-md-4 p-0'
								title={t("home.part20")}
								navigation='/products/subSubCategory/655bbdd1c29668369f97490d'
								image={clothes}
								body={t("home.part22")}
							/>
						</div>


<SliderWithRating
id='sr1'
title1={t("home.part21")}
title2={t("home.part23")}
navigation='products/subCategoryPrd/656946418535d7773e731deb'
url='/products/SubCategory/656946418535d7773e731deb'
skip1='13'
limit1='6'
skip2='19'
limit2='6'
skip3='25'
limit3='6'
/>
						<Footer />
					</div>
				</div>
				
			</div>
		</>
	);
};
