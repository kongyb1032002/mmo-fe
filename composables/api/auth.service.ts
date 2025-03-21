import { useCoreAxiosInstance } from "../core/axios.instance"
import type { LoginForm } from "../forms/login.form"
import type { RegisterForm } from "../forms/register.form"
import type { ResetPasswordModel } from "../models/reset-password.model"
import type { UserModel } from "../models/user.model"

export const useAuthService = () => {
  const axios = useCoreAxiosInstance()
  const prefix = "/auth"
  const { $toast } = useNuxtApp();
  const router = useRouter()
  const login = async (form: LoginForm) => {
    return await axios.post(`${prefix}/login`, form).then(res => {
      var token = useCookie("authToken")
      token.value = res.data.token;
      return res.data
    })
  }

  const register = async (form: RegisterForm) => {
    return await axios.post(`${prefix}/register`, form).then(res => {
      $toast("Đăng ký thành công!", {
        type: "success",
        onClose: () => {
          router.push("/")
        }
      });
      var token = useCookie("authToken")
      token.value = res.data.token;
      return res
    }).catch(err => {
      $toast("Register failed", {
        type: "error",
      });
      return Promise.reject(err)
    })
  }

  const forget = async (email: string) => {
    return await axios.get(`${prefix}/reset-password/${email}`,)
      .then(res => {
        $toast("Vui lòng kiểm tra email!", {
          type: "success",
        });
        return res
      }).catch(err => {
        $toast("Quên mật khẩu thất bại, vui lòng kiểm tra địa chỉ email", {
          type: "error",
        });
      })
  }

  const reset = async (form: ResetPasswordModel) => {
    return await axios.put(`${prefix}/reset-password`, form)
      .then(res => {
        $toast("Đặt lại mật khẩu thành công!", {
          type: "success",
          onClose: () => {
            router.push("/login")
          }
        });
        return res
      }
      )
  }

  const profile = async (): Promise<UserModel> => {
    const data = await axios.get(`${prefix}/profile`)
    return {
      ...data.data.userInfo,
      avatar: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    };
  }


  return { login, register, forget, reset, profile }
}
