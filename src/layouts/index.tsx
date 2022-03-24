import SiderBar from 'SiderBar'
import { Layout, Result, Button, Avatar, Popover, message } from 'antd'
import { connect } from 'dva'
import Loading from 'loading'
import { useCallback, useEffect, useState, createContext } from 'react'
import { IRouteProps, history } from 'umi'
import 'style/index.less' // 全局样式引入
import { cookies } from 'utils'
import { getUserInfo, getTenantInfo, logoutFunc } from './api'
import style from './index.less'
import { pageRoutes } from '@/../config/routes'


const { Header, Content } = Layout
export const AuthContent = createContext(null)

function renderChildren(props: IRouteProps) {
  const routerURL = history.location.pathname

  const pageRoutesJSON = JSON.stringify(pageRoutes)
  if (!pageRoutesJSON.includes(routerURL)) {
    return (
      <div className={style.antResultWrap}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary" onClick={() => history.push('/overview')}>
              返回首页
            </Button>
          }
        />
      </div>
    )
  }

  if (
    routerURL !== '/' &&
    !props.authList.some((item) => item.includes(routerURL))
  ) {
    return (
      <div className={style.antResultWrap}>
        <Result
          status="403"
          title="403"
          subTitle="抱歉，您没有该页面的权限，请联系管理员"
          extra={
            <Button type="primary" onClick={() => history.push('/overview')}>
              返回首页
            </Button>
          }
        />
      </div>
    )
  }

  localStorage.setItem('routerURL', routerURL)
  return <div style={{ minWidth: 1090, height: '100%' }}>{props.children}</div>
}

interface IUser {
  nickName?: string
  phoneNumber?: string
  email?: string
}

function LayoutPage({ children, dispatch }: IRouteProps) {
  const [authList, setAuthList] = useState([])
  const [userInfo, setUserInfo] = useState<IUser>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const loadUserInfo = useCallback(
    (data) => {
      const { authList, user } = data
      dispatch({
        type: 'auth/updateUserInfo',
        payload: {
          authList,
          user
        }
      })
      sessionStorage.setItem('tenantId', data.user.tenantId)
      sessionStorage.setItem('userDepartmentId', data.user.departmentId)
    },
    [dispatch]
  )

  const handleLoginOut = async() => {
    const res = await logoutFunc()
    if (res.code === 200) {
      message.success('退出成功')
      cookies.removeUserToken()
      history.replace('/login')
    }
  }

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        if (res && res.code === 200) {
          setIsLoading(false)
          loadUserInfo(res.data)
          setUserInfo(res.data.user)
          setAuthList(res.data.authList)
          getTenantInfo().then((res) => {
            if (res && res.code === 200) {
              const { topDepartment, tenant } = res.data
              dispatch({
                type: 'auth/updateTenantInfo',
                payload: {
                  topDepartment,
                  tenant
                }
              })
              sessionStorage.setItem('department', topDepartment.name)
              sessionStorage.setItem('departmentId', topDepartment.departmentId)
            }
          })
        }
      })
      .catch((res) => {
        if (res.code === 500) {
          window.location.reload()
        }
      })
  }, [])

  return (
    <AuthContent.Provider value={{ authList }}>
      {isLoading ? (
        <Loading />
      ) : (
        <Layout style={{ minHeight: '100vh' }} className={style.layoutWrap}>
          <SiderBar authList={authList} />
          <Layout className={style.siteLayout}>
            <Header className={style.siteLayoutHeader} style={{ padding: 0 }}>
              <Popover
                placement="bottomRight"
                content={
                  <a style={{ color: '#E9392F' }} onClick={handleLoginOut}>
                    退出登录
                  </a>
                }
                trigger="click"
              >
                <Avatar className={style.avatar} size={32}>
                  {userInfo?.nickName?.slice(0, 1)}
                </Avatar>
              </Popover>
            </Header>
            <Content className={style.content}>
              {authList.length > 0 && renderChildren({ children, authList })}
            </Content>
          </Layout>
        </Layout>
      )}
    </AuthContent.Provider>
  )
}

export default connect(({ auth }) => ({ auth }))(LayoutPage)
